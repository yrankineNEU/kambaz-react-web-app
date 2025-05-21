import { Form, Col, Row, Button, Container } from "react-bootstrap";
import { Link } from "react-router";

export default function Signin() {
  return (
    <Container fluid>
      <h3>Sign in</h3>
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
      </Form>

      <Link to="/Kambaz/Dashboard" id="wd-signin-btn">
        <Button variant="primary" size="lg" id="wd-signin-btn">
          Signin
        </Button>
      </Link>

      <div>
        <Link
          to="/Kambaz/Account/Signup"
          id="wd-signup-link"
          className="list-group-item border-0 text-primary text-decoration-underline pt-3"
        >
          Signup
        </Link>
      </div>
    </Container>
  );
}
