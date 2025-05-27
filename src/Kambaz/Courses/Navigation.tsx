import { ListGroup } from "react-bootstrap";
import { Link, useLocation, useParams } from "react-router-dom";
export default function CourseNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <ListGroup
      id="wd-course-navigation"
      style={{ width: 150 }}
      className="wd list-group fs-5 rounded-0"
    >
      {links.map((label) => {
        const path = `/Kambaz/Courses/${cid}/${label}`;
        const isActive = pathname.includes(`/${label}`);
        return (
          <ListGroup.Item
            key={label}
            as={Link}
            to={path}
            className={`wd list-group fs-5 rounded-0 ${
              isActive
                ? "list-group-item active border border-0"
                : "list-group-item text-danger border border-0"
            }`}
          >
            {label}
          </ListGroup.Item>
        );
      })}
    </ListGroup>
  );
}
