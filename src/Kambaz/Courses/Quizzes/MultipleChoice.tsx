import { useState } from "react";
import { Button, Card, Form, FormCheck, FormSelect } from "react-bootstrap";

export default function MultipleChoice({
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

  const handleAddOption = () => {
    const newOptions = [
      ...editingQuestion.options,
      `Option ${editingQuestion.options.length + 1}`,
    ];
    setEditingQuestion({ ...editingQuestion, options: newOptions });
  };

  const handleRemoveOption = (optionIndex: number) => {
    if (editingQuestion.options.length > 2) {
      const newOptions = editingQuestion.options.filter(
        (_: any, index: number) => index !== optionIndex
      );
      let newCorrectAnswer = editingQuestion.correctAnswer;

      // Adjust correct answer if needed
      if (editingQuestion.correctAnswer >= optionIndex) {
        newCorrectAnswer = Math.max(0, editingQuestion.correctAnswer - 1);
      }

      setEditingQuestion({
        ...editingQuestion,
        options: newOptions,
        correctAnswer: newCorrectAnswer,
      });
    }
  };

  const handleOptionChange = (optionIndex: number, value: string) => {
    const newOptions = editingQuestion.options.map(
      (option: string, index: number) =>
        index === optionIndex ? value : option
    );
    setEditingQuestion({ ...editingQuestion, options: newOptions });
  };

  const handleFieldChange = (field: string, value: any) => {
    setEditingQuestion({ ...editingQuestion, [field]: value });
  };

  return (
    <Card className="mb-3">
      <Card.Header className="d-flex justify-content-between align-items-center">
        <div>
          <span className="fw-bold">Question {questionIndex + 1}</span>
          <span className="text-muted ms-2">Multiple Choice</span>
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
                placeholder="Enter your question text here..."
              />
            </Form.Group>

            {/* Answer Options */}
            <Form.Group className="mb-3">
              <Form.Label>Answers</Form.Label>
              <div className="border rounded p-3 bg-light">
                {editingQuestion.options.map(
                  (option: string, optionIndex: number) => (
                    <div
                      key={optionIndex}
                      className="d-flex align-items-center mb-2"
                    >
                      <FormCheck
                        type="radio"
                        name={`correct-${questionIndex}`}
                        checked={editingQuestion.correctAnswer === optionIndex}
                        onChange={() =>
                          handleFieldChange("correctAnswer", optionIndex)
                        }
                        className="me-2"
                        title="Mark as correct answer"
                      />
                      <Form.Control
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(optionIndex, e.target.value)
                        }
                        className="me-2"
                        placeholder={`Option ${optionIndex + 1}`}
                      />
                      {editingQuestion.options.length > 2 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveOption(optionIndex)}
                          title="Remove this option"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  )
                )}
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={handleAddOption}
                  className="mt-2"
                >
                  + Add Another Answer
                </Button>
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
              {question.options &&
                question.options.map((option: string, index: number) => (
                  <div key={index} className="form-check mb-2">
                    <input
                      className="form-check-input"
                      type="radio"
                      disabled
                      checked={question.correctAnswer === index}
                    />
                    <label
                      className={`form-check-label ${
                        question.correctAnswer === index
                          ? "fw-bold text-success"
                          : ""
                      }`}
                    >
                      {option}
                    </label>
                    {question.correctAnswer === index && (
                      <span className="text-success ms-2">
                        ✓ Correct Answer
                      </span>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
