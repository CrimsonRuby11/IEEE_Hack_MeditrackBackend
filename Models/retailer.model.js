import mongoose, { Schema, SchemaType, model, mongo } from "mongoose";

const RetailerSchema = mongoose.Schema(
    {
        retailerName: {
            type: String,
            required: true
        },

        retailerEmail: {
            type: String,
            required: true
        },

        retailerPass: {
            type: String,
            required: true
        }
    }
)

const retailerModel = model('Retailer', RetailerSchema)

export default retailerModel