import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import { Form, Button, Container, Row, Col, FormSelect } from "react-bootstrap";

export default function AssignmentEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid, aid } = useParams(); // Get course ID and assignment ID from URL

  // Get assignments from Redux store
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  // Debug logging
  console.log("URL params - cid:", cid, "aid:", aid);
  console.log("All assignments:", assignments);

  // Determine if we're editing an existing assignment
  const isEditing = Boolean(aid) && aid !== "Editor";
  const existingAssignment = isEditing
    ? assignments.find((a: any) => a._id === aid)
    : null;

  console.log("isEditing:", isEditing);
  console.log("existingAssignment:", existingAssignment);

  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    points: 100,
    DueDate: "",
    AvailableDate: "",
    UntilDate: "",
    course: cid,
  });

  // Load existing assignment data when editing
  useEffect(() => {
    if (isEditing && existingAssignment) {
      setAssignment({
        title: existingAssignment.title || "",
        description: existingAssignment.description || "",
        points:
          typeof existingAssignment.points === "string"
            ? parseInt(existingAssignment.points) || 100
            : existingAssignment.points || 100,
        DueDate: existingAssignment.DueDate || "",
        AvailableDate: existingAssignment.AvailableDate || "",
        UntilDate: existingAssignment.UntilDate || "",
        course: cid,
      });
    }
  }, [isEditing, existingAssignment, cid]);

  const handleSave = () => {
    // Make sure we have all required fields
    if (!assignment.title.trim()) {
      alert("Please enter an assignment title");
      return;
    }

    console.log("handleSave - isEditing:", isEditing);
    console.log("handleSave - assignment:", assignment);
    console.log("handleSave - aid:", aid);

    if (isEditing) {
      // Update existing assignment
      const updatePayload = { ...assignment, _id: aid };
      console.log("Dispatching updateAssignment with:", updatePayload);
      dispatch(updateAssignment(updatePayload));
    } else {
      // Create new assignment
      console.log("Dispatching addAssignment with:", assignment);
      dispatch(addAssignment(assignment));
    }

    // Navigate back to assignments
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    // Navigate back without saving
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <Container fluid>
      <h3>{isEditing ? "Edit Assignment" : "New Assignment"}</h3>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Assignment Name
          </Form.Label>
          <Col xs={8}>
            <Form.Control
              type="text"
              value={assignment.title}
              onChange={(e) =>
                setAssignment({ ...assignment, title: e.target.value })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col xs={10}>
            <Form.Control
              as="textarea"
              value={assignment.description}
              onChange={(e) =>
                setAssignment({ ...assignment, description: e.target.value })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="text-end">
            Points
          </Form.Label>
          <Col xs={8}>
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: parseInt(e.target.value) || 0,
                })
              }
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="text-end">
            Assignment Group
          </Form.Label>
          <Col xs={8}>
            <FormSelect>
              <option selected>ASSIGNMENTS</option>
              <option value="1">QUIZZES</option>
              <option value="2">EXAMS</option>
            </FormSelect>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="text-end">
            Display Grade As
          </Form.Label>
          <Col xs={8}>
            <FormSelect>
              <option selected>Percentage</option>
              <option value="1">Decimal</option>
              <option value="2">Letter</option>
            </FormSelect>
          </Col>
        </Form.Group>
        <div id="wd-editor-submission-type">
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-end">
              Submission Type
            </Form.Label>
            <Col xs={8} className="border border-secondary rounded p-2 mb-3">
              <FormSelect>
                <option selected>Online</option>
                <option value="1">In-Person</option>
              </FormSelect>
              <Form.Label column sm={6} className="fw-bold">
                Online Entry Options
              </Form.Label>
              <Col sm={{ span: 10 }}>
                <Form.Check label="Text Entry" />
                <Form.Check label="Website URL" />
                <Form.Check label="Media Recording" />
                <Form.Check label="Student Annotation" />
                <Form.Check label="File Uploads" />
              </Col>
            </Col>
          </Form.Group>
        </div>
        <div id="wd-editor-assign">
          <Form.Group as={Row}>
            <Form.Label column sm={2} className="text-end">
              Assign
            </Form.Label>
            <Col xs={8} className="border border-secondary rounded p-2 mb-3">
              <Form.Label className="fw-bold pt-3">Assign to</Form.Label>

              <Form.Control type="email" placeholder="Everyone" />
              <Col sm={{ span: 10 }}>
                <Form.Group controlId="dueDate">
                  <Form.Label className="fw-bold pt-3">Due</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.DueDate}
                    onChange={(e) =>
                      setAssignment({ ...assignment, DueDate: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={{ span: 5 }}>
                <Form.Group controlId="availableFrom">
                  <Form.Label className="fw-bold pt-3">
                    Available from
                  </Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.AvailableDate}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        AvailableDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
              <Col xs={{ span: 5 }}>
                <Form.Group controlId="availableUntil">
                  <Form.Label className="fw-bold pt-3">Until</Form.Label>
                  <Form.Control
                    type="date"
                    value={assignment.UntilDate}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        UntilDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </Col>
            </Col>
          </Form.Group>
        </div>
      </Form>
      <hr />
      <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          onClick={handleSave}
        >
          {isEditing ? "Update" : "Save"}
        </Button>
      </Link>
      <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
        <Button
          variant="secondary"
          size="lg"
          className="me-1 float-end"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Link>
    </Container>
  );
}
