import mongoose from "mongoose";
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;


const keeperSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    hotel: {
      type: ObjectId,
      ref: "User",
    },
    pet: {
      type: ObjectId,
      ref: "Pet",
    }
  },
  { timestamps: true }
);


export default mongoose.model("Keeper", keeperSchema);
