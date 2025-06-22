import { Dropdown } from "react-bootstrap";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import GreenCheckmark from "../Modules/GreenCheckmark";

export default function QuizEditButtons({
  quizId,
  quiz,
  deleteQuiz,
  togglePublish,
}: {
  quizId: string;
  quiz: any;
  deleteQuiz: (quizId: string) => void;
  togglePublish: (quizId: string, currentStatus: boolean) => void;
}) {
  const navigate = useNavigate();

  return (
    <div className="float-end">
      <span
        onClick={() => togglePublish(quizId, quiz.published)}
        style={{
          cursor: "pointer",
          opacity: quiz.published ? 1 : 0.3,
        }}
      >
        <GreenCheckmark />
      </span>

      <Dropdown>
        <Dropdown.Toggle
          variant="link"
          className="p-0 border-0 text-dark"
          id={`dropdown-${quizId}`}
        >
          <IoEllipsisVertical className="fs-4" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => navigate(`${quizId}`)}>
            Edit
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => deleteQuiz(quizId)}
            className="text-danger"
          >
            Delete
          </Dropdown.Item>
          <Dropdown.Item onClick={() => togglePublish(quizId, quiz.published)}>
            {quiz.published ? "Unpublish" : "Publish"}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
