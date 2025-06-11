import { useEffect, useState } from "react";
import { Button, Col, Container, Form, FormSelect, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cid, aid } = useParams();

  // Get assignments from Redux store
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  // Helper function to convert "May 13 at 12:00am" to "YYYY-MM-DD"
  const convertToDateInput = (dateString: string): string => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    } catch (error) {
      return "";
    }
  };

  // Helper function to convert "YYYY-MM-DD" back to readable format
  const convertFromDateInput = (dateString: string): string => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      };
      return date.toLocaleDateString("en-US", options) + " at 11:59pm";
    } catch (error) {
      return dateString;
    }
  };

  // Determine if we're editing an existing assignment
  const isEditing = Boolean(aid) && aid !== "new" && aid !== "Editor";
  const existingAssignment = isEditing
    ? assignments.find((a: any) => a._id === aid)
    : null;

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
        DueDate: convertToDateInput(existingAssignment.DueDate || ""),
        AvailableDate: convertToDateInput(
          existingAssignment.AvailableDate || ""
        ),
        UntilDate: convertToDateInput(existingAssignment.UntilDate || ""),
        course: cid,
      });
    } else if (!isEditing) {
      // Reset form for new assignment
      setAssignment({
        title: "",
        description: "",
        points: 100,
        DueDate: "",
        AvailableDate: "",
        UntilDate: "",
        course: cid,
      });
    }
  }, [isEditing, existingAssignment, cid, aid]);

  const handleSave = async () => {
    // Make sure we have all required fields
    if (!assignment.title.trim()) {
      alert("Please enter an assignment title");
      return;
    }

    try {
      if (isEditing && aid) {
        // Update existing assignment - convert dates back to readable format
        const updatePayload = {
          ...assignment,
          _id: aid,
          DueDate: convertFromDateInput(assignment.DueDate),
          AvailableDate: convertFromDateInput(assignment.AvailableDate),
          UntilDate: convertFromDateInput(assignment.UntilDate),
        };

        // Update on server
        await client.updateAssignment(updatePayload);

        // Update in Redux store
        dispatch(updateAssignment(updatePayload));
      } else {
        // Create new assignment - convert dates to readable format
        const newAssignment = {
          ...assignment,
          DueDate: convertFromDateInput(assignment.DueDate),
          AvailableDate: convertFromDateInput(assignment.AvailableDate),
          UntilDate: convertFromDateInput(assignment.UntilDate),
        };

        // Create on server - this returns the assignment with server-generated ID
        const createdAssignment = await client.createAssignmentForCourse(
          cid!,
          newAssignment
        );

        // Add to Redux store with the server-generated ID
        dispatch(addAssignment(createdAssignment));
      }

      // Navigate back to assignments
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (error) {
      console.error("Error saving assignment:", error);
      alert("Failed to save assignment. Please try again.");
    }
  };

  const handleCancel = () => {
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

      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        onClick={handleSave}
      >
        {isEditing ? "Update" : "Save"}
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </Container>
  );
}
