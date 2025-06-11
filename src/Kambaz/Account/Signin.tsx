import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as client from "./client";
import { setCurrentUser } from "./reducer";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };

  return (
    <Container fluid>
      <h3>Sign in</h3>
      <Form>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <FormControl
              value={credentials.username || ""} // ← Fixed: Use value instead of defaultValue
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              className="mb-2"
              placeholder="username"
              id="wd-username"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <FormControl
              value={credentials.password || ""} // ← Fixed: Use value instead of defaultValue
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className="mb-2"
              placeholder="password"
              type="password"
              id="wd-password"
            />
          </Col>
        </Form.Group>
      </Form>
      <Link to="/Kambaz/Dashboard" id="wd-signin-btn">
        <Button onClick={signin} id="wd-signin-btn" className="w-100">
          Sign in
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
