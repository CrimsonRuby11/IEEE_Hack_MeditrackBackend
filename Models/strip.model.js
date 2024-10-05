import mongoose, { Schema, SchemaType, model, mongo } from "mongoose";

const StripSchema = mongoose.Schema ({
    drugname: {
        type: String,
        required: true,
    },

    batchid: {
        type: String,
        required: true,
    },

    expiry: {
        type: String,
        required: true,
    },
})

const stripModel = model('Strip', StripSchema)

export default stripModel