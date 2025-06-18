import { useEffect, useRef } from "react";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import AssignmentControls from "./AssignmentControls";
import AssignmentEditButtons from "./AssignmentEditButtons";
import * as client from "./client";
import GreenEditButton from "./GreenEditButton";
import { addAssignment, deleteAssignment } from "./reducer";

export default function Assignments() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const { cid } = useParams();
  const dispatch = useDispatch();
  const isMountedRef = useRef(true);

  // Get assignments from Redux store
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);

  // Fetch assignments from server when component mounts or course changes
  useEffect(() => {
    isMountedRef.current = true;

    const fetchAssignments = async () => {
      try {
        if (!cid) return;

        const serverAssignments = await client.findAssignmentsForCourse(cid);

        // Only proceed if component is still mounted
        if (!isMountedRef.current) return;

        // First, remove all existing assignments for this course from Redux
        const currentCourseAssignments = assignments.filter(
          (a: any) => a.course === cid
        );
        currentCourseAssignments.forEach((a: any) => {
          dispatch(deleteAssignment(a._id));
        });

        // Then add fresh assignments from server
        serverAssignments.forEach((assignment: any) => {
          dispatch(addAssignment(assignment));
        });
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    fetchAssignments();

    // Cleanup function
    return () => {
      isMountedRef.current = false;
    };
  }, [cid]); // Only re-fetch when course ID changes

  const handleDeleteAssignment = async (assignmentId: string) => {
    try {
      // Delete from server
      await client.deleteAssignment(assignmentId);

      // Delete from Redux store
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error("Error deleting assignment:", error);
      alert("Failed to delete assignment. Please try again.");
    }
  };

  return (
    <div>
      {isFaculty && <AssignmentControls />}
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
                  {isFaculty && <GreenEditButton />}
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
                        | Not available until {assignment.AvailableDate} | Due:{" "}
                        {assignment.DueDate} | {assignment.points} pts
                      </span>
                    </div>
                  </div>
                  {isFaculty && (
                    <AssignmentEditButtons
                      assignmentId={assignment._id}
                      deleteAssignment={handleDeleteAssignment}
                    />
                  )}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
