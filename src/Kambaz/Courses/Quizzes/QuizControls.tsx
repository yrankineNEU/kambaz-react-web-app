import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate, useParams } from "react-router-dom";
import * as client from "./client";

export default function QuizControls() {
  const navigate = useNavigate();
  const { cid } = useParams();

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuizForCourse(cid!, {
      title: "New Quiz",
    });
    navigate(`${newQuiz._id}`);
  };

  return (
    <div id="wd-quiz-controls" className="text-nowrap">
      <InputGroup
        className="position-relative me-2"
        style={{ maxWidth: "300px" }}
      >
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl placeholder="Search for Quiz" />
      </InputGroup>

      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-group-btn"
      >
        <HiOutlineDotsVertical
          className="position-relative me-2"
          style={{ bottom: "1px" }}
        />
      </Button>

      <Button
        variant="danger"
        onClick={handleAddQuiz}
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Quiz
      </Button>
    </div>
  );
}
