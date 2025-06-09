import { Button, Col, Container, Form, FormSelect, Row } from "react-bootstrap";
import { Link, useParams } from "react-router";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignment = db.assignments.find((a) => a._id === aid);
  if (!assignment) return <p>Assignment not found.</p>;

  return (
    <Container fluid>
      <h3>Assignment Editor</h3>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>
            Assignment Name
          </Form.Label>
          <Col xs={8}>
            <Form.Control type="text" defaultValue={assignment.title} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col xs={10}>
            <Form.Control as="textarea" defaultValue={assignment.description} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2} className="text-end">
            Points
          </Form.Label>
          <Col xs={8}>
            <Form.Control type="number" defaultValue={assignment.points} />
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
              <option value="1">Decmial</option>
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
                  <Form.Control type="date" defaultValue={assignment.DueDate} />
                </Form.Group>
              </Col>
              <Col xs={{ span: 5 }}>
                <Form.Group controlId="availableFrom">
                  <Form.Label className="fw-bold pt-3">
                    Available from
                  </Form.Label>
                  <Form.Control
                    type="date"
                    defaultValue={assignment.AvailableDate}
                  />
                </Form.Group>
              </Col>
              <Col xs={{ span: 5 }}>
                <Form.Group controlId="availableUntil">
                  <Form.Label className="fw-bold pt-3">Until</Form.Label>
                  <Form.Control type="date" defaultValue={assignment.DueDate} />
                </Form.Group>
              </Col>
            </Col>
          </Form.Group>
        </div>
      </Form>
      <hr />
      <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
        <Button variant="danger" size="lg" className="me-1 float-end">
          Save
        </Button>
      </Link>
      <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
        <Button variant="secondary" size="lg" className="me-1 float-end">
          Cancel
        </Button>
      </Link>
    </Container>
  );
}
