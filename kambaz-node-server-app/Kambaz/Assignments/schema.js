import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    course: { type: String, ref: "CourseModel" },
    AvailableDate: String,
    DueDate: String,
    UntilDate: String,
    points: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
