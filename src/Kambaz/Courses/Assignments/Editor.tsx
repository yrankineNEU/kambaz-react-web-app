import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, FormSelect, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { updateAssignment, addAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid?: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get assignments from Redux store
  const assignments = useSelector(
    (state: any) => state.assignments.assignments
  );

  // Find the assignment to edit (if aid present)
  const existingAssignment = aid
    ? assignments.find((a: any) => a._id === aid)
    : null;

  // Local state for form fields
  const [name, setName] = useState(existingAssignment?.name || "");
  const [description, setDescription] = useState(
    existingAssignment?.description || ""
  );
  const [points, setPoints] = useState(existingAssignment?.points || 0);
  const [availableDate, setAvailableDate] = useState(
    existingAssignment?.AvailableDate || ""
  );
  const [dueDate, setDueDate] = useState(existingAssignment?.DueDate || "");

  // Save handler
  function handleSave() {
    if (aid && existingAssignment) {
      // Update existing
      dispatch(
        updateAssignment({
          ...existingAssignment,
          name,
          description,
          points,
          AvailableDate: availableDate,
          DueDate: dueDate,
        })
      );
    } else {
      // Add new assignment
      dispatch(
        addAssignment({
          title: name,
          description,
          points,
          course: cid,
          AvailableDate: availableDate,
          DueDate: dueDate,
        })
      );
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  }

  // Cancel handler
  function handleCancel() {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  }

  if (aid && !existingAssignment) {
    return <p>Assignment not found.</p>;
  }

  return (
    <Container fluid>
      <h3>{aid ? "Edit Assignment" : "New Assignment"}</h3>
      <Form>
        <Form.Group as={Row} className="mb-3" controlId="assignmentName">
          <Form.Label column sm={2}>
            Assignment Name
          </Form.Label>
          <Col xs={8}>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter assignment name"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="assignmentDescription">
          <Col xs={10}>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="assignmentPoints">
          <Form.Label column sm={2} className="text-end">
            Points
          </Form.Label>
          <Col xs={8}>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              min={0}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="availableDate">
          <Form.Label column sm={2} className="text-end">
            Available Date
          </Form.Label>
          <Col xs={8}>
            <Form.Control
              type="date"
              value={availableDate}
              onChange={(e) => setAvailableDate(e.target.value)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="dueDate">
          <Form.Label column sm={2} className="text-end">
            Due Date
          </Form.Label>
          <Col xs={8}>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Col>
        </Form.Group>

        <hr />

        <Button
          variant="primary"
          size="lg"
          className="me-2 float-end"
          onClick={handleSave}
        >
          Save
        </Button>

        <Button
          variant="secondary"
          size="lg"
          className="float-end"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Form>
    </Container>
  );
}
