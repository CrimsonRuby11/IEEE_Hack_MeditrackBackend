import mongoose, { Schema, SchemaType, model, mongo } from "mongoose";

const ProducerSchema = mongoose.Schema(
    {
        companyname: {
            type: String,
            required: true,
        },

        companyaddress: {
            type: String,
            required: true,
        },

        cinnum: {
            type: String,
            required: true,
        },

        druglicense: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },

        pass: {
            type: String,
            required: true,
        }
    }
)

const producerModel = model('Producer', ProducerSchema)

export default producerModel