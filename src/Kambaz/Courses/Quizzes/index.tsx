import { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import * as client from "./client";
import QuizControls from "./QuizControls";
import QuizEditButtons from "./QuizEditButtons";
import { addQuiz, deleteQuiz } from "./reducer";

export default function Quizzes() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        if (!cid) return;
        const serverQuizzes = await client.findQuizzesForCourse(cid);
        serverQuizzes.forEach((quiz: any) => {
          dispatch(addQuiz(quiz));
        });
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, [cid, dispatch]);

  // Temporary handler - we'll implement this later
  const handleDeleteQuiz = async (quizId: string) => {
    try {
      // Delete from server
      await client.deleteQuiz(quizId);

      // Delete from Redux store
      dispatch(deleteQuiz(quizId));
    } catch (error) {
      console.error("Error deleting assignment:", error);
      alert("Failed to delete assignment. Please try again.");
    }
  };

  return (
    <div>
      {isFaculty && <QuizControls />}
      <br />
      <br />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-quizzes">
        <ListGroup.Item className="wd-quiz p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" /> Assignment Quizzes
          </div>
          <ListGroup className="wd-lessons rounded-0">
            {quizzes.filter((quiz: any) => quiz.course === cid).length === 0 ? (
              <ListGroup.Item className="text-center py-4">
                <p className="mb-0">No quizzes available</p>
                {isFaculty && (
                  <p className="text-muted">
                    Click the + Quiz button to create your first quiz
                  </p>
                )}
              </ListGroup.Item>
            ) : (
              quizzes
                .filter((quiz: any) => quiz.course === cid)
                .map((quiz: any) => (
                  <ListGroup.Item key={quiz._id} className="wd-lesson p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    <div>
                      <div className="fw-bold">
                        {isFaculty ? (
                          <Link
                            to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                            id="wd-quizzes-link"
                            className="list-group-item border-0"
                          >
                            {quiz.title}
                          </Link>
                        ) : (
                          <span className="list-group-item border-0">
                            {quiz.title}
                          </span>
                        )}
                      </div>
                      <div className="text-danger small">
                        Multiple Modules
                        <span className="text-body ms-1">
                          | Not available until {quiz.availableDate} | Due:
                          {quiz.dueDate} | {quiz.points} pts | {quiz.questions}{" "}
                          questions
                        </span>
                      </div>
                    </div>
                    {isFaculty && (
                      <QuizEditButtons
                        quizId={quiz._id}
                        quiz={quiz}
                        deleteQuiz={handleDeleteQuiz}
                        togglePublish={() => {}}
                      />
                    )}
                  </ListGroup.Item>
                ))
            )}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
