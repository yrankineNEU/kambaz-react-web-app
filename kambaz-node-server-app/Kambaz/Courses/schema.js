import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    number: String,
    startDate: String,
    endDate: String,
    department: String,
    credits: Number,
    description: String,
    author: String,
  },
  { collection: "courses", strict: false }
);

export default courseSchema;
