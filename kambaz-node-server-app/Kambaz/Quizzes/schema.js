import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, default: "New Quiz" },
    description: String,
    course: { type: String, ref: "CourseModel" },
    quizType: { type: String, default: "Graded Quiz" },
    points: { type: Number, default: 0 },
    assignmentGroup: { type: String, default: "Quizzes" },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: { type: String, default: "Immediately" },
    accessCode: String,
    oneQuestionAtTime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: String,
    availableDate: String,
    untilDate: String,
    published: { type: Boolean, default: false },
    questions: [],
  },
  { collection: "quizzes" }
);

export default quizSchema;
