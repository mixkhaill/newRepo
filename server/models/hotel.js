import mongoose from 'mongoose'

const {Schema} = mongoose
const {ObjectId} = mongoose.Schema

const hotelSchema = new Schema ({
    title: {
        type: String,
        required: "Title is required",
    },
    description: {
        type: String,
        required: "description is required",
        maxlength: 10000,
    },
    location: {
        type: String,
    },
    price: {
        type: Number,
        required: "Price is required", 
        trim: true,
    },
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    from: {
        type: Date,

    },
    to: {
        type: Date,

    },
    types: {
        type: String,
    },
    },
{timestamps: true}
);
export default mongoose.model('Hotel', hotelSchema)