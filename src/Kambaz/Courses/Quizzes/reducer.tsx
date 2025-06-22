import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    addQuiz: (state, { payload: quiz }) => {
      // Check for duplicates
      const exists = state.quizzes.some((q: any) => q._id === quiz._id);
      if (exists) return;

      const newQuiz: any = {
        _id: quiz._id || uuidv4(),
        title: quiz.title,
        course: quiz.course,
        description: quiz.description,
        quizType: quiz.quizType,
        points: quiz.points,
        assignmentGroup: quiz.assignmentGroup,
        shuffleAnswers: quiz.shuffleAnswers,
        timeLimit: quiz.timeLimit,
        multipleAttempts: quiz.multipleAttempts,
        showCorrectAnswers: quiz.showCorrectAnswers,
        accessCode: quiz.accessCode,
        oneQuestionAtTime: quiz.oneQuestionAtTime,
        webcamRequired: quiz.webcamRequired,
        lockQuestionsAfterAnswering: quiz.lockQuestionsAfterAnswering,
        dueDate: quiz.dueDate,
        availableDate: quiz.availableDate,
        untilDate: quiz.untilDate,
        published: quiz.published,
        questions: quiz.questions || [],
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quiz._id ? quiz : q
      ) as any;
    },
    toggleQuizPublished: (state, { payload: { quizId, published } }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === quizId ? { ...q, published } : q
      ) as any;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, toggleQuizPublished } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
