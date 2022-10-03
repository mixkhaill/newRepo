import mongoose from "mongoose";
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;


const petSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    age: {
      type: Number,
      trim: true,
      required: "Age is required",
    },
    types: {
      type: String,
      trim: true,
      required: true,
    },
    owner: {
      type: ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);


export default mongoose.model("Pet", petSchema);
