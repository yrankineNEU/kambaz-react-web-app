import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormCheck,
  FormSelect,
  Nav,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import QuestionEditor from "./QuestionEditor";
import { addQuiz, updateQuiz } from "./reducer";

export default function QuizEditor() {
  const navigate = useNavigate();
  const { cid, qid } = useParams();
  const dispatch = useDispatch();

  // Get quizzes from Redux store
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);

  // Determine if we're editing an existing quiz
  const isEditing = Boolean(qid) && qid !== "new" && qid !== "Editor";
  const existingQuiz = isEditing
    ? quizzes.find((q: any) => q._id === qid)
    : null;

  // Tab state
  const [activeTab, setActiveTab] = useState("details");

  // Quiz form state
  const [quiz, setQuiz] = useState({
    title: "New Quiz",
    description: "",
    course: cid,
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: "Immediately",
    accessCode: "",
    oneQuestionAtTime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    dueDate: "",
    availableDate: "",
    untilDate: "",
    published: false,
    questions: [],
  });

  // Load existing quiz data when editing
  useEffect(() => {
    if (isEditing && existingQuiz) {
      setQuiz({
        title: existingQuiz.title || "New Quiz",
        description: existingQuiz.description || "",
        course: cid,
        quizType: existingQuiz.quizType || "Graded Quiz",
        points: existingQuiz.points || 0,
        assignmentGroup: existingQuiz.assignmentGroup || "Quizzes",
        shuffleAnswers:
          existingQuiz.shuffleAnswers !== undefined
            ? existingQuiz.shuffleAnswers
            : true,
        timeLimit: existingQuiz.timeLimit || 20,
        multipleAttempts: existingQuiz.multipleAttempts || false,
        showCorrectAnswers: existingQuiz.showCorrectAnswers || "Immediately",
        accessCode: existingQuiz.accessCode || "",
        oneQuestionAtTime:
          existingQuiz.oneQuestionAtTime !== undefined
            ? existingQuiz.oneQuestionAtTime
            : true,
        webcamRequired: existingQuiz.webcamRequired || false,
        lockQuestionsAfterAnswering:
          existingQuiz.lockQuestionsAfterAnswering || false,
        dueDate: existingQuiz.dueDate || "",
        availableDate: existingQuiz.availableDate || "",
        untilDate: existingQuiz.untilDate || "",
        published: existingQuiz.published || false,
        questions: existingQuiz.questions || [],
      });
    } else if (!isEditing) {
      // Reset form for new quiz
      setQuiz({
        title: "New Quiz",
        description: "",
        course: cid,
        quizType: "Graded Quiz",
        points: 0,
        assignmentGroup: "Quizzes",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        showCorrectAnswers: "Immediately",
        accessCode: "",
        oneQuestionAtTime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: "",
        availableDate: "",
        untilDate: "",
        published: false,
        questions: [],
      });
    }
  }, [isEditing, existingQuiz, cid, qid]);

  // Handle form field changes
  const handleInputChange = (field: string, value: any) => {
    setQuiz({ ...quiz, [field]: value });
  };

  // Save quiz
  const handleSave = async () => {
    // Make sure we have required fields
    if (!quiz.title.trim()) {
      alert("Please enter a quiz title");
      return;
    }

    try {
      if (isEditing && qid) {
        // Update existing quiz
        const updatePayload = {
          ...quiz,
          _id: qid,
        };

        // Update on server
        await client.updateQuiz(updatePayload);

        // Update in Redux store
        dispatch(updateQuiz(updatePayload));

        navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
      } else {
        // Create new quiz
        const createdQuiz = await client.createQuizForCourse(cid!, quiz);

        // Make sure we have the complete quiz object with server ID
        const completeQuiz = {
          ...quiz,
          _id: createdQuiz._id || createdQuiz.id,
          ...createdQuiz,
        };

        // Add to Redux store
        dispatch(addQuiz(completeQuiz));

        navigate(`/Kambaz/Courses/${cid}/Quizzes/${completeQuiz._id}`);
      }
    } catch (error: any) {
      console.error("Error saving quiz:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Failed to save quiz";
      alert(`Error: ${errorMessage}`);
    }
  };

  // Save and publish
  const handleSaveAndPublish = async () => {
    if (!quiz.title.trim()) {
      alert("Please enter a quiz title");
      return;
    }

    try {
      const publishedQuiz = { ...quiz, published: true };

      if (isEditing && qid) {
        // Update existing quiz and publish
        const updatePayload = {
          ...publishedQuiz,
          _id: qid,
        };

        await client.updateQuiz(updatePayload);
        dispatch(updateQuiz(updatePayload));
      } else {
        // Create new quiz and publish
        const createdQuiz = await client.createQuizForCourse(
          cid!,
          publishedQuiz
        );

        const completeQuiz = {
          ...publishedQuiz,
          _id: createdQuiz._id || createdQuiz.id,
          ...createdQuiz,
        };

        dispatch(addQuiz(completeQuiz));
      }

      navigate(`/Kambaz/Courses/${cid}/Quizzes`);
    } catch (error: any) {
      console.error("Error saving and publishing quiz:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to save and publish quiz";
      alert(`Error: ${errorMessage}`);
    }
  };

  // Cancel and go back
  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
  };

  return (
    <Container fluid>
      <h3>{isEditing ? "Edit Quiz" : "New Quiz"}</h3>
      <Row>
        <Col>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="details">
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "details"}
                    onClick={() => setActiveTab("details")}
                    style={{ cursor: "pointer" }}
                  >
                    Details
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={activeTab === "questions"}
                    onClick={() => setActiveTab("questions")}
                    style={{ cursor: "pointer" }}
                  >
                    Questions
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              {activeTab === "details" && (
                <Form>
                  {/* Title */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Title
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        value={quiz.title}
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                      />
                    </Col>
                  </Form.Group>

                  {/* Description */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Description
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        value={quiz.description}
                        onChange={(e) =>
                          handleInputChange("description", e.target.value)
                        }
                      />
                    </Col>
                  </Form.Group>

                  {/* Quiz Type */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Quiz Type
                    </Form.Label>
                    <Col sm={10}>
                      <FormSelect
                        value={quiz.quizType}
                        onChange={(e) =>
                          handleInputChange("quizType", e.target.value)
                        }
                      >
                        <option value="Graded Quiz">Graded Quiz</option>
                        <option value="Practice Quiz">Practice Quiz</option>
                        <option value="Graded Survey">Graded Survey</option>
                        <option value="Ungraded Survey">Ungraded Survey</option>
                      </FormSelect>
                    </Col>
                  </Form.Group>

                  {/* Points */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Points
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="number"
                        value={quiz.points}
                        onChange={(e) =>
                          handleInputChange(
                            "points",
                            parseInt(e.target.value) || 0
                          )
                        }
                      />
                    </Col>
                  </Form.Group>

                  {/* Assignment Group */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Assignment Group
                    </Form.Label>
                    <Col sm={10}>
                      <FormSelect
                        value={quiz.assignmentGroup}
                        onChange={(e) =>
                          handleInputChange("assignmentGroup", e.target.value)
                        }
                      >
                        <option value="Quizzes">Quizzes</option>
                        <option value="Exams">Exams</option>
                        <option value="Assignments">Assignments</option>
                        <option value="Project">Project</option>
                      </FormSelect>
                    </Col>
                  </Form.Group>

                  {/* Shuffle Answers */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Shuffle Answers
                    </Form.Label>
                    <Col sm={10}>
                      <FormCheck
                        type="radio"
                        label="Yes"
                        name="shuffleAnswers"
                        checked={quiz.shuffleAnswers === true}
                        onChange={() =>
                          handleInputChange("shuffleAnswers", true)
                        }
                        className="me-3"
                        inline
                      />
                      <FormCheck
                        type="radio"
                        label="No"
                        name="shuffleAnswers"
                        checked={quiz.shuffleAnswers === false}
                        onChange={() =>
                          handleInputChange("shuffleAnswers", false)
                        }
                        inline
                      />
                    </Col>
                  </Form.Group>

                  {/* Time Limit */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Time Limit
                    </Form.Label>
                    <Col sm={10}>
                      <div className="d-flex align-items-center">
                        <Form.Control
                          type="number"
                          value={quiz.timeLimit}
                          onChange={(e) =>
                            handleInputChange(
                              "timeLimit",
                              parseInt(e.target.value) || 20
                            )
                          }
                          style={{ width: "100px" }}
                          className="me-2"
                        />
                        <span>Minutes</span>
                      </div>
                    </Col>
                  </Form.Group>

                  {/* Multiple Attempts */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Multiple Attempts
                    </Form.Label>
                    <Col sm={10}>
                      <FormCheck
                        type="radio"
                        label="No"
                        name="multipleAttempts"
                        checked={quiz.multipleAttempts === false}
                        onChange={() =>
                          handleInputChange("multipleAttempts", false)
                        }
                        className="me-3"
                        inline
                      />
                      <FormCheck
                        type="radio"
                        label="Yes"
                        name="multipleAttempts"
                        checked={quiz.multipleAttempts === true}
                        onChange={() =>
                          handleInputChange("multipleAttempts", true)
                        }
                        inline
                      />
                    </Col>
                  </Form.Group>

                  {/* Show Correct Answers */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Show Correct Answers
                    </Form.Label>
                    <Col sm={10}>
                      <FormSelect
                        value={quiz.showCorrectAnswers}
                        onChange={(e) =>
                          handleInputChange(
                            "showCorrectAnswers",
                            e.target.value
                          )
                        }
                      >
                        <option value="Immediately">Immediately</option>
                        <option value="After Due Date">After Due Date</option>
                        <option value="Never">Never</option>
                      </FormSelect>
                    </Col>
                  </Form.Group>

                  {/* Access Code */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Access Code
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        value={quiz.accessCode}
                        onChange={(e) =>
                          handleInputChange("accessCode", e.target.value)
                        }
                        placeholder="Leave blank for no access code"
                      />
                    </Col>
                  </Form.Group>

                  {/* One Question at a Time */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      One Question at a Time
                    </Form.Label>
                    <Col sm={10}>
                      <FormCheck
                        type="radio"
                        label="Yes"
                        name="oneQuestionAtTime"
                        checked={quiz.oneQuestionAtTime === true}
                        onChange={() =>
                          handleInputChange("oneQuestionAtTime", true)
                        }
                        className="me-3"
                        inline
                      />
                      <FormCheck
                        type="radio"
                        label="No"
                        name="oneQuestionAtTime"
                        checked={quiz.oneQuestionAtTime === false}
                        onChange={() =>
                          handleInputChange("oneQuestionAtTime", false)
                        }
                        inline
                      />
                    </Col>
                  </Form.Group>

                  {/* Webcam Required */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Webcam Required
                    </Form.Label>
                    <Col sm={10}>
                      <FormCheck
                        type="radio"
                        label="No"
                        name="webcamRequired"
                        checked={quiz.webcamRequired === false}
                        onChange={() =>
                          handleInputChange("webcamRequired", false)
                        }
                        className="me-3"
                        inline
                      />
                      <FormCheck
                        type="radio"
                        label="Yes"
                        name="webcamRequired"
                        checked={quiz.webcamRequired === true}
                        onChange={() =>
                          handleInputChange("webcamRequired", true)
                        }
                        inline
                      />
                    </Col>
                  </Form.Group>

                  {/* Lock Questions After Answering */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Lock Questions After Answering
                    </Form.Label>
                    <Col sm={10}>
                      <FormCheck
                        type="radio"
                        label="No"
                        name="lockQuestionsAfterAnswering"
                        checked={quiz.lockQuestionsAfterAnswering === false}
                        onChange={() =>
                          handleInputChange(
                            "lockQuestionsAfterAnswering",
                            false
                          )
                        }
                        className="me-3"
                        inline
                      />
                      <FormCheck
                        type="radio"
                        label="Yes"
                        name="lockQuestionsAfterAnswering"
                        checked={quiz.lockQuestionsAfterAnswering === true}
                        onChange={() =>
                          handleInputChange("lockQuestionsAfterAnswering", true)
                        }
                        inline
                      />
                    </Col>
                  </Form.Group>

                  {/* Due Date */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Due Date
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="date"
                        value={quiz.dueDate}
                        onChange={(e) =>
                          handleInputChange("dueDate", e.target.value)
                        }
                      />
                    </Col>
                  </Form.Group>

                  {/* Available Date */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Available Date
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="date"
                        value={quiz.availableDate}
                        onChange={(e) =>
                          handleInputChange("availableDate", e.target.value)
                        }
                      />
                    </Col>
                  </Form.Group>

                  {/* Until Date */}
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2} className="text-end">
                      Until Date
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="date"
                        value={quiz.untilDate}
                        onChange={(e) =>
                          handleInputChange("untilDate", e.target.value)
                        }
                      />
                    </Col>
                  </Form.Group>

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button variant="outline-danger" onClick={handleSave}>
                      Save
                    </Button>
                    <Button variant="danger" onClick={handleSaveAndPublish}>
                      Save & Publish
                    </Button>
                  </div>
                </Form>
              )}

              {activeTab === "questions" && (
                <QuestionEditor quiz={quiz} onUpdateQuiz={setQuiz} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
