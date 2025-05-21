import { FormSelect, Form, Col, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router";

export default function Profile() {
  return (
    <Container fluid>
      <h3>Profile</h3>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="text" defaultValue="alice" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="password" defaultValue="123" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="text" defaultValue="Alice" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="text" defaultValue="Wonderland" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="date" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="email" defaultValue="alice@wonderland.com" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="text" defaultValue="User" />
          </Col>
        </Form.Group>
      </Form>

      <Link to="/Kambaz/Account/Signin" id="wd-profile-btn">
        <Button variant="danger" size="lg" id="wd-profile-btn">
          Sign out
        </Button>
      </Link>
    </Container>
  );
}
