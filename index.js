import express from 'express';
import mongoose from 'mongoose';

const app = express();

import batchModel from './Models/batch.model.js';
import producerModel from './Models/producer.model.js';
import retailerModel from './Models/retailer.model.js';
import stripModel from './Models/strip.model.js';
import consumerModel from './Models/consumer.model.js';
import purchaseModel from './Models/purchase.model.js';

app.use(express.json())

mongoose.connect("mongodb+srv://skprithviraj8:crimsonmongo@drugstracker-db.myvp0.mongodb.net/?retryWrites=true&w=majority&appName=drugstracker-db")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Error connecting to mongo", err));

app.get('/', (req, res) => {
    res.send("mesg")
})

app.post('/producer/newBatch', async (req, res) => {
    const { drugname, quantity, recipientId, producerId, expiry } = req.body;

    try {
        const batchDoc = await batchModel.create({
            drugname, quantity, recipientId, producerId, expiry
        })

        let batchid = batchDoc._id;

        for(let i = 0; i < quantity; i++) {
            const stripDoc = await stripModel.create({
                drugname, batchid, expiry
            })
        }

        res.json({ok: true})
    } catch(err) {
        console.log(req)
        console.log(err);
    }

})

app.post('/producer/getBatches', async (req, res) => {
    const { producerId } = req.body;

    try {
        const batches = await batchModel.find({producerId: producerId});
        res.json({ok: true, batchList: batches})
    } catch(err) {
        console.log(err);
    }
})

app.post('/retailer/getBatch', async (req, res) => {
    const { batchId } = req.body;

    try {
        console.log(batchId)
        const batch = await batchModel.findOne({'_id': batchId});
        res.json({ok: true, batchList: batch});
    } catch(err) {
        console.log(err);
    }
})

app.post('/retailer/updatebatch', async (req, res) => {

    const { batchId, recipientId } = req.body;

    try {
        await batchModel.findOneAndUpdate({"batchId": batchId}, {"recipientId": recipientId});
    } catch(err) {
        console.log(err);
    }

})

app.post('/newProducer', async (req, res) => {
    const { producerId, companyname, companyaddress, cinnum, druglicense, email, pass } = req.body;

    try {
        const producerDoc = await producerModel.create({
            producerId, companyname, companyaddress, cinnum, druglicense, email, pass
        })

        res.json({ok: true})
    } catch(err) {
        console.log(err);
    }
})

app.post('/newRetailer', async (req, res) => {
    const { retailerName, retailerEmail, retailerPass } = req.body;

    try {
        const retailerDoc = await retailerModel.create({
            retailerName, retailerEmail, retailerPass
        })

        res.json({ok: true})
    } catch(err) {
        console.log(err);
    }
})

app.post('/getRetailer', async (req, res) => {
    const { recipientId } = req.body;

    try {
        const retailers = await retailerModel.findOne({'_id': recipientId});

        console.log(retailers);
        res.json({ok: true, retailer: retailers});
    } catch(err) {
        console.log(err);
    }
})

app.post('/getRetailerId', async (req, res) => {
    const { retailerName } = req.body;

    try {
        const retailers = await retailerModel.find({"retailerName": retailerName});

        res.json({ok: true, retailer: retailers});
    } catch(err) {
        console.log(err);
    }
})

app.post('/getProducer', async (req, res) => {
    const { producerId } = req.body;

    try {
        const producers = await producerModel.findOne({"_id": producerId});

        console.log(producers);
        res.json({ok: true, producer: producers});
    } catch(err) {
        console.log(err);
    }
})

app.post('/consumer/getPurchases', async (req, res) => {

    const { phone } = req.body;

    try {
        const purchases = await purchaseModel.find({"phone": phone});

        console.log(purchases);
        res.json({ok: true, purchases: purchases});
    } catch(err) {
        console.log(err);
    }

})

app.post('/newConsumer', async (req, res) => {

    const { username, phone } = req.body;

    try {

        const newConsumer = await consumerModel.create({
            username, phone
        })

        console.log(newConsumer);
        res.json({ok: true});

    } catch(err) {
        console.log(err);
    }

})

app.post('/retailer/newPurchase', async (req, res) => {

    const { stripId, quantity, expiry, phone } = req.body;

    try {
        const newPurchase = await purchaseModel.create({
            stripId, quantity, expiry, phone
        })

        console.log(newPurchase)
        res.json({ok: true})
    } catch(err) {
        console.log(err);
    }
})

app.post('/getStrip', async (req, res) => {

    const { stripId } = req.body;

    try {
        const stripObject = await stripModel.findOne({"_id": stripId});

        console.log(stripObject);
        res.json({ok: true, strip: stripObject});
    } catch(err) {
        console.log(err);
        }
})

app.listen(2000, () => {
    console.log("Server running on port: 2000")
})

