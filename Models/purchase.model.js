import mongoose, { Schema, SchemaType, model, mongo } from "mongoose";

const PurchaseSchema = mongoose.Schema(
    {
        stripId: {
            type: String,
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
        },

        expiry: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true
        }
    }
)

const purchaseModel = model('Purchase', PurchaseSchema)

export default purchaseModel