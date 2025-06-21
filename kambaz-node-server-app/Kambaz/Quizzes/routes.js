import * as dao from "./dao.js";

// Generates HTTP request connecting data from dao
export default function QuizRoutes(app) {
  // Create a quiz
  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quiz = { ...req.body, course: courseId };
    const newQuiz = await dao.createQuiz(quiz);
    res.json(newQuiz);
  });

  // Get all quizzes for course
  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  });

  // Get specific quiz by ID (you'll need this for Quiz Details)
  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quiz = await dao.findQuizById(quizId);
    res.json(quiz);
  });

  // Update quiz details
  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.updateQuiz(quizId, req.body);
    res.json(status);
  });

  // Delete quiz
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const status = await dao.deleteQuiz(quizId);
    res.json(status);
  });

  // Toggle publish status (specific to quizzes)
  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    const { quizId } = req.params;
    const { published } = req.body;
    const status = await dao.toggleQuizPublished(quizId, published);
    res.json(status);
  });
}
