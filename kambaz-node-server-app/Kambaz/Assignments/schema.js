import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    points: Number,
    dueDate: Date,
    availableDate: Date,
    course: { type: String, ref: "CourseModel" },
  },
  { collection: "assignments" }
);

export default assignmentSchema;
