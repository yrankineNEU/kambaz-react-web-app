import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { TiPencil } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        if (!qid) return;
        const quizData = await client.findQuizById(qid);
        setQuiz(quizData);
      } catch (error) {
        console.error("Error fetching quiz:", error);
      } finally {
        setLoading(false);
      }
    };

    if (qid) {
      fetchQuiz();
    }
  }, [qid]);

  if (loading) return <div>Loading...</div>;
  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>{quiz.title}</h2>

        {isFaculty ? (
          <div>
            <Button
              variant="outline-secondary"
              className="me-2"
              onClick={() =>
                navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/preview`)
              }
            >
              Preview
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => navigate(`edit`)}
            >
              <TiPencil
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Edit
            </Button>
          </div>
        ) : (
          <Button variant="danger">Start Quiz</Button>
        )}
      </div>

      <div className="row">
        <div className="col-md-8">
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td>
                  <strong>Quiz Type:</strong>
                </td>
                <td>{quiz.quizType}</td>
              </tr>
              <tr>
                <td>
                  <strong>Points:</strong>
                </td>
                <td>{quiz.points}</td>
              </tr>
              <tr>
                <td>
                  <strong>Assignment Group:</strong>
                </td>
                <td>{quiz.assignmentGroup}</td>
              </tr>
              <tr>
                <td>
                  <strong>Shuffle Answers:</strong>
                </td>
                <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Time Limit:</strong>
                </td>
                <td>{quiz.timeLimit} Minutes</td>
              </tr>
              <tr>
                <td>
                  <strong>Multiple Attempts:</strong>
                </td>
                <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Show Correct Answers:</strong>
                </td>
                <td>{quiz.showCorrectAnswers}</td>
              </tr>
              <tr>
                <td>
                  <strong>One Question at a Time:</strong>
                </td>
                <td>{quiz.oneQuestionAtTime ? "Yes" : "No"}</td>
              </tr>
              <tr>
                <td>
                  <strong>Due Date:</strong>
                </td>
                <td>{quiz.dueDate}</td>
              </tr>
              <tr>
                <td>
                  <strong>Available Date:</strong>
                </td>
                <td>{quiz.availableDate}</td>
              </tr>
              <tr>
                <td>
                  <strong>Until Date:</strong>
                </td>
                <td>{quiz.untilDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
