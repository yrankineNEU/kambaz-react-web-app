import { Button, Card } from "react-bootstrap";
import FillBlank from "./FillBlank";
import MultipleChoice from "./MultipleChoice";
import TrueFalse from "./TrueFalse";

export default function QuestionEditor({
  quiz,
  onUpdateQuiz,
}: {
  quiz: any;
  onUpdateQuiz: (updatedQuiz: any) => void;
}) {
  const handleAddQuestion = () => {
    const newQuestion = {
      id: Date.now().toString(),
      title: `Question ${quiz.questions.length + 1}`,
      question: "",
      type: "multiple-choice",
      points: 1,
      options: ["Option 1", "Option 2", "Option 3", "Option 4"],
      correctAnswer: 0,
      isEditing: true,
    };

    onUpdateQuiz({
      ...quiz,
      questions: [...quiz.questions, newQuestion],
    });
  };

  const handleUpdateQuestion = (
    questionIndex: number,
    updatedQuestion: any
  ) => {
    const updatedQuestions = quiz.questions.map((q: any, index: number) =>
      index === questionIndex ? updatedQuestion : q
    );
    onUpdateQuiz({ ...quiz, questions: updatedQuestions });
  };

  const handleDeleteQuestion = (questionIndex: number) => {
    const updatedQuestions = quiz.questions.filter(
      (_: any, index: number) => index !== questionIndex
    );
    onUpdateQuiz({ ...quiz, questions: updatedQuestions });
  };

  const totalPoints = quiz.questions.reduce(
    (sum: number, q: any) => sum + (q.points || 0),
    0
  );

  const renderQuestionEditor = (question: any, index: number) => {
    const commonProps = {
      question,
      questionIndex: index,
      onUpdateQuestion: handleUpdateQuestion,
      onDeleteQuestion: handleDeleteQuestion,
    };

    // Switch question type
    switch (question.type) {
      case "multiple-choice":
        return (
          <MultipleChoice key={`${question.id}-${index}`} {...commonProps} />
        );
      case "true-false":
        return <TrueFalse key={`${question.id}-${index}`} {...commonProps} />;
      case "fill-blank":
        return <FillBlank key={`${question.id}-${index}`} {...commonProps} />;
      default:
        return (
          <MultipleChoice key={`${question.id}-${index}`} {...commonProps} />
        );
    }
  };

  return (
    <div>
      {/* Contain header with new question button */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>Questions</h5>
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">Points: {totalPoints}</span>
          <Button variant="outline-danger" onClick={handleAddQuestion}>
            + New Question
          </Button>
        </div>
      </div>

      {/* Display list of questions */}
      {quiz.questions.length === 0 ? (
        <Card className="text-center py-4 bg-light">
          <Card.Body>
            <p className="mb-2">No questions yet</p>
            <p className="text-muted small">
              Click "+ New Question" to add your first question
            </p>
          </Card.Body>
        </Card>
      ) : (
        <div className="questions-list">
          {quiz.questions.map((question: any, index: number) =>
            renderQuestionEditor(question, index)
          )}
        </div>
      )}
    </div>
  );
}
