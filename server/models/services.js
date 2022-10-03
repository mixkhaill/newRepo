import mongoose from "mongoose";
import nodemon from "nodemon";
const { Schema } = mongoose;
const {ObjectId} = mongoose.Schema;


const servicesSchema = new Schema(
  {
    mealFirstTime: {
      type: Number,
      trim: true,
      required: true,
      min: 8,
      max: 22,
    },
    mealSecondTime: {
      type: Number,
      trim: true,
      required: true,
      min: 8,
      max: 22,
    },
    mealThirdTime: {
      type: Number,
      trim: true,
      required: true,
      min: 8,
      max: 22,
    },
    mealFourthTime: {
      type: Number,
      trim: true,
      required: true,
      min: 8,
      max: 22,
    },
    medical: {
      type: Boolean,
      required: false,
    },
    pet: {
      type: ObjectId,
      ref: "Pet",
    }
  },
  { timestamps: true }
);


export default mongoose.model("Services", servicesSchema);
