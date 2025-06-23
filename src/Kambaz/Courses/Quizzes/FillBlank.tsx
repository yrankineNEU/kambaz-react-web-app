import { useState } from "react";
import { Button, Card, Form, FormCheck, FormSelect } from "react-bootstrap";

export default function FillBlank({
  question,
  questionIndex,
  onUpdateQuestion,
  onDeleteQuestion,
}: {
  question: any;
  questionIndex: number;
  onUpdateQuestion: (index: number, question: any) => void;
  onDeleteQuestion: (index: number) => void;
}) {
  const [editingQuestion, setEditingQuestion] = useState(question);
  const [isEditing, setIsEditing] = useState(question.isEditing || false);

  const handleSave = () => {
    onUpdateQuestion(questionIndex, { ...editingQuestion, isEditing: false });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingQuestion(question);
    setIsEditing(false);
    if (question.isEditing) {
      // If this was a new question, remove it
      onDeleteQuestion(questionIndex);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleFieldChange = (field: string, value: any) => {
    setEditingQuestion({ ...editingQuestion, [field]: value });
  };

  const handleAddAnswer = () => {
    const currentAnswers = Array.isArray(editingQuestion.correctAnswer)
      ? editingQuestion.correctAnswer
      : [];
    const newAnswers = [...currentAnswers, ""];
    setEditingQuestion({ ...editingQuestion, correctAnswer: newAnswers });
  };

  const handleRemoveAnswer = (answerIndex: number) => {
    const currentAnswers = Array.isArray(editingQuestion.correctAnswer)
      ? editingQuestion.correctAnswer
      : [];
    if (currentAnswers.length > 1) {
      const newAnswers = currentAnswers.filter(
        (_: any, index: number) => index !== answerIndex
      );
      setEditingQuestion({ ...editingQuestion, correctAnswer: newAnswers });
    }
  };

  const handleAnswerChange = (answerIndex: number, value: string) => {
    const currentAnswers = Array.isArray(editingQuestion.correctAnswer)
      ? editingQuestion.correctAnswer
      : [];
    const newAnswers = currentAnswers.map((answer: string, index: number) =>
      index === answerIndex ? value : answer
    );
    setEditingQuestion({ ...editingQuestion, correctAnswer: newAnswers });
  };

  // Ensure we have at least one answer
  const answers = Array.isArray(editingQuestion.correctAnswer)
    ? editingQuestion.correctAnswer
    : [""];

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <span className="fw-bold">Question {questionIndex + 1}</span>
          <span className="text-muted ms-2">Fill in the Blank</span>
        </div>
        <div>
          {isEditing ? (
            <>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleCancel}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="danger" size="sm" onClick={handleSave}>
                Update Question
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={handleEdit}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => onDeleteQuestion(questionIndex)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </Card.Header>

      <Card.Body>
        {isEditing ? (
          <Form>
            {/* Question Title */}
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editingQuestion.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                placeholder="Enter question title"
              />
            </Form.Group>

            {/* Question Type */}
            <Form.Group className="mb-3">
              <Form.Label>Question Type</Form.Label>
              <FormSelect
                value={editingQuestion.type}
                onChange={(e) => handleFieldChange("type", e.target.value)}
              >
                <option value="multiple-choice">Multiple Choice</option>
                <option value="true-false">True/False</option>
                <option value="fill-blank">Fill in the Blank</option>
              </FormSelect>
            </Form.Group>

            {/* Points */}
            <Form.Group className="mb-3">
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                value={editingQuestion.points}
                onChange={(e) =>
                  handleFieldChange("points", parseInt(e.target.value) || 1)
                }
                min="1"
                style={{ width: "100px" }}
              />
            </Form.Group>

            {/* Question Text */}
            <Form.Group className="mb-3">
              <Form.Label>Question</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editingQuestion.question}
                onChange={(e) => handleFieldChange("question", e.target.value)}
                placeholder="Enter your fill-in-the-blank question here. Use _____ for the blank."
              />
              <Form.Text className="text-muted">
                Use underscores (____) to indicate where students should fill in
                their answer
              </Form.Text>
            </Form.Group>

            {/* Possible Correct Answers */}
            <Form.Group className="mb-3">
              <Form.Label>Possible Correct Answers</Form.Label>
              <div className="border rounded p-3 bg-light">
                {answers.map((answer: string, answerIndex: number) => (
                  <div
                    key={answerIndex}
                    className="d-flex align-items-center mb-2"
                  >
                    <Form.Control
                      type="text"
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(answerIndex, e.target.value)
                      }
                      className="me-2"
                      placeholder={`Possible answer ${answerIndex + 1}`}
                    />
                    {answers.length > 1 && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleRemoveAnswer(answerIndex)}
                        title="Remove this answer"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleAddAnswer}
                  className="mt-2"
                >
                  + Add Another Answer
                </Button>
              </div>
              <Form.Text className="text-muted">
                Add all possible correct answers. Matching can be case-sensitive
                or case-insensitive.
              </Form.Text>
            </Form.Group>

            {/* Case Sensitivity Option */}
            <Form.Group className="mb-3">
              <FormCheck
                type="checkbox"
                label="Case insensitive matching"
                checked={editingQuestion.caseInsensitive || false}
                onChange={(e) =>
                  handleFieldChange("caseInsensitive", e.target.checked)
                }
              />
              <Form.Text className="text-muted">
                If checked, "answer" will match "Answer", "ANSWER", etc.
              </Form.Text>
            </Form.Group>
          </Form>
        ) : (
          // Preview Mode
          <div>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <h6 className="mb-2">
                {question.title || `Question ${questionIndex + 1}`}
              </h6>
              <span className="badge bg-primary">{question.points} pts</span>
            </div>

            <p className="mb-3">
              {question.question || "No question text provided"}
            </p>

            <div className="ms-3">
              <div className="border rounded p-3 bg-light mb-3">
                <Form.Control
                  type="text"
                  placeholder="Student would type their answer here..."
                  disabled
                  className="mb-2"
                />
              </div>

              <div className="mb-2">
                <small className="text-muted fw-bold">Accepted Answers:</small>
                <div className="mt-1">
                  {Array.isArray(question.correctAnswer) &&
                  question.correctAnswer.length > 0 ? (
                    question.correctAnswer
                      .filter((answer: string) => answer.trim() !== "")
                      .map((answer: string, index: number) => (
                        <span
                          key={index}
                          className="badge bg-success me-1 mb-1"
                        >
                          {answer}
                        </span>
                      ))
                  ) : (
                    <span className="text-muted">
                      No correct answers defined
                    </span>
                  )}
                </div>
              </div>

              {question.caseInsensitive && (
                <div>
                  <small className="text-info">
                    <i className="bi bi-info-circle"></i> Case insensitive
                    matching enabled
                  </small>
                </div>
              )}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
