import { useState } from "react";
import { Button, Card, Form, FormCheck, FormSelect } from "react-bootstrap";

export default function TrueFalse({
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

  const handleTypeChange = (newType: string) => {
    let updatedQuestion = { ...editingQuestion, type: newType };

    // Convert question data to match new type
    if (newType === "multiple-choice") {
      updatedQuestion = {
        ...updatedQuestion,
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctAnswer: 0,
      };
    } else if (newType === "true-false") {
      updatedQuestion = {
        ...updatedQuestion,
        correctAnswer: true,
      };
    } else if (newType === "fill-blank") {
      updatedQuestion = {
        ...updatedQuestion,
        correctAnswer: [],
      };
    }

    setEditingQuestion(updatedQuestion);
    onUpdateQuestion(questionIndex, updatedQuestion);
  };

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <span className="fw-bold">Question {questionIndex + 1}</span>
          <span className="text-muted ms-2">True/False</span>
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
                onChange={(e) => handleTypeChange(e.target.value)}
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
                placeholder="Enter your True/False question here..."
              />
            </Form.Group>

            {/* True/False Answer Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Correct Answer</Form.Label>
              <div className="border rounded p-3 bg-light">
                <FormCheck
                  type="radio"
                  label="True"
                  name={`tf-${questionIndex}`}
                  checked={editingQuestion.correctAnswer === true}
                  onChange={() => handleFieldChange("correctAnswer", true)}
                  className="mb-2"
                />
                <FormCheck
                  type="radio"
                  label="False"
                  name={`tf-${questionIndex}`}
                  checked={editingQuestion.correctAnswer === false}
                  onChange={() => handleFieldChange("correctAnswer", false)}
                />
              </div>
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
              <div className="form-check mb-2">
                <input
                  className="form-check-input"
                  type="radio"
                  disabled
                  checked={question.correctAnswer === true}
                />
                <label
                  className={`form-check-label ${
                    question.correctAnswer === true
                      ? "fw-bold text-success"
                      : ""
                  }`}
                >
                  True
                </label>
                {question.correctAnswer === true && (
                  <span className="text-success ms-2">✓ Correct Answer</span>
                )}
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  disabled
                  checked={question.correctAnswer === false}
                />
                <label
                  className={`form-check-label ${
                    question.correctAnswer === false
                      ? "fw-bold text-success"
                      : ""
                  }`}
                >
                  False
                </label>
                {question.correctAnswer === false && (
                  <span className="text-success ms-2">✓ Correct Answer</span>
                )}
              </div>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
