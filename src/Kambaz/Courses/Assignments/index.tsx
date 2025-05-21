import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import AssignmentControls from "./AssignmentControls";
import GreenEditButton from "./GreenEditButton";
import { Link } from "react-router";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <AssignmentControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS
            <ModuleControlButtons />
          </div>
          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <GreenEditButton />
              <div>
                <div className="fw-bold">
                  <Link
                    to="/Kambaz/Courses/1234/Assignments/123"
                    id="wd-assignments-link"
                    className="list-group-item border-0"
                  >
                    A1
                  </Link>
                </div>
                <div className="text-danger small">
                  Multiple Modules
                  <span className="text-body ms-1">
                    | Not available until May 6 at 12:00am | Due May 13 at
                    11:59pm | 100 points
                  </span>
                </div>
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <GreenEditButton />
              <div>
                <div className="fw-bold">
                  {" "}
                  <Link
                    to="/Kambaz/Courses/1234/Assignments/123"
                    id="wd-assignments-link"
                    className="list-group-item border-0"
                  >
                    A2
                  </Link>
                </div>
                <div className="text-danger small">
                  Multiple Modules
                  <span className="text-body ms-1">
                    | Not available until May 10 at 12:00am | Due May 17 at
                    11:59pm | 100 points
                  </span>
                </div>
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <GreenEditButton />
              <div>
                <div className="fw-bold">
                  <Link
                    to="/Kambaz/Courses/1234/Assignments/123"
                    id="wd-assignments-link"
                    className="list-group-item border-0"
                  >
                    A3
                  </Link>
                </div>
                <div className="text-danger small">
                  Multiple Modules
                  <span className="text-body ms-1">
                    | Not available until May 20 at 12:00am | Due May 27 at
                    11:59pm | 100 points
                  </span>
                </div>
              </div>{" "}
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
