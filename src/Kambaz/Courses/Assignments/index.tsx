import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentControls";
import GreenEditButton from "./GreenEditButton";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function Assignments() {
  const { cid } = useParams();

  // Get assignments from Redux store instead of db
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  return (
    <div>
      <AssignmentControls />
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroup.Item className="wd-assignment p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> ASSIGNMENTS
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroup.Item
                  key={assignment._id}
                  className="wd-lesson p-3 ps-1"
                >
                  <BsGripVertical className="me-2 fs-3" />
                  <GreenEditButton />
                  <div>
                    <div className="fw-bold">
                      <Link
                        to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                        id="wd-assignments-link"
                        className="list-group-item border-0"
                      >
                        {assignment.title}
                      </Link>
                    </div>
                    <div className="text-danger small">
                      Multiple Modules
                      <span className="text-body ms-1">
                        | Not available until {assignment.availableDate} | Due{" "}
                        {assignment.dueDate} | {assignment.points} pts
                      </span>
                    </div>
                  </div>
                  <LessonControlButtons />
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
