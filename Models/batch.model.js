import mongoose, { Schema, SchemaType, model, mongo } from "mongoose";

const BatchSchema = mongoose.Schema(
    {
        drugname: {
            type: String,
            required: true
        },

        quantity: {
            type: Number,
            required: true,
        },

        recipientId: {
            type: String,
            required: false
        },

        producerId: {
            type: String,
            required: true,
        },

        expiry: {
            type: String,
            required: true
        },
    }
)

const batchModel = model('Batch', BatchSchema)

export default batchModel