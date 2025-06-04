import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AccountNavigation() {
  return (
    <Container
      fluid
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      <Link
        to="/Kambaz/Account/Signin"
        id="wd-account-signin"
        className="list-group-item active border border-0"
      >
        Signin
      </Link>
      <Link
        to="/Kambaz/Account/Signup"
        id="wd-account-signup"
        className="list-group-item text-danger border border-0"
      >
        Signup
      </Link>
      <Link
        to="/Kambaz/Account/Profile"
        id="wd-account-profile"
        className="list-group-item text-danger border border-0"
      >
        Profile
      </Link>
    </Container>
  );
}
