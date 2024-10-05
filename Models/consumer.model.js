import mongoose, { Schema, SchemaType, model, mongo } from "mongoose";

const ConsumerSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },

        phone: {
            type: String,
            required: true,
        },
    }
)

const consumerModel = model('Consumer', ConsumerSchema)

export default consumerModel