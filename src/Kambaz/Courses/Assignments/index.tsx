import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import AssignmentControls from "./AssignmentControls";
import GreenEditButton from "./GreenEditButton";
import { Link, useParams } from "react-router-dom"; // Use react-router-dom
import { useSelector } from "react-redux";

export default function Assignments({ isFaculty }: { isFaculty: boolean }) {
  const { cid, aid } = useParams<{ cid: string; aid?: string }>();

  // Use only Redux assignments
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  return (
    <div>
      {/* Show controls only to faculty */}
      {isFaculty && <AssignmentControls />}

      <br />
      <br />
      <br />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
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

                  {/* Only show Edit button if faculty, pass assignment id */}
                  {isFaculty && (
                    <GreenEditButton aid={assignment._id} cid={cid!} />
                  )}

                  <div>
                    <div className="fw-bold">
                      {isFaculty ? (
                        <Link
                          to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                          id="wd-assignments-link"
                          className="list-group-item border-0"
                        >
                          {assignment.title}
                        </Link>
                      ) : (
                        <span>{assignment.title}</span>
                      )}
                    </div>
                    <div className="text-danger small">
                      Multiple Modules
                      <span className="text-body ms-1">
                        | Not available until {assignment.AvailableDate} | Due{" "}
                        {assignment.DueDate} | {assignment.points}
                      </span>
                    </div>
                  </div>

                  {/* Show lesson control buttons only to faculty */}
                  {isFaculty && <LessonControlButtons />}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
