import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

// This file gathers data from mongo db

// Adds a new quiz to mondodb database
export function createQuiz(quiz) {
  const newQuiz = { ...quiz, _id: uuidv4() };
  return model.create(newQuiz); // saves to database
}

// Updates existing quiz in database
export const updateQuiz = (quizId, quizUpdates) => {
  return model.updateOne({ _id: quizId }, { $set: quizUpdates });
};

// Finds all quizzes connected to courseId
export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

// Finds quiz by quiz id
export function findQuizById(quizId) {
  return model.findOne({ _id: quizId });
}

// Deletes quiz from databse
export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

// Update 'published' value for quiz
export function toggleQuizPublished(quizId, published) {
  return model.updateOne({ _id: quizId }, { published });
}
