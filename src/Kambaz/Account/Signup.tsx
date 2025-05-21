import { FormSelect, Form, Col, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router";

export default function Signup() {
  return (
    <Container fluid>
      <h3>Sign up</h3>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="username" placeholder="username" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="password" placeholder="password" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="password" placeholder="verify password" />
          </Col>
        </Form.Group>
      </Form>

      <Link to="/Kambaz/Account/Profile" id="wd-profile-btn">
        <Button variant="primary" size="lg" id="wd-profile-btn">
          Sign up
        </Button>
      </Link>

      <div>
        <Link
          to="/Kambaz/Account/Signin"
          id="wd-signup-link"
          className="list-group-item border-0 text-primary text-decoration-underline pt-3"
        >
          Signin
        </Link>
      </div>
    </Container>
  );
}
