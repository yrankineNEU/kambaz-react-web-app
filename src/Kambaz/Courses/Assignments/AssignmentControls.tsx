import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

// Purpose: Toolbar shown above assignment list
export default function AssignmentControls() {
  const navigate = useNavigate();
  const { cid } = useParams();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const handleAddClick = () => {
    if (isFaculty) {
      navigate(`/Kambaz/Courses/${cid}/Assignments/new`);
    }
  };

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <InputGroup
        className="position-relative me-2"
        style={{ maxWidth: "400px" }}
      >
        {/* Shows search bar */}
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl placeholder="Search..." />
      </InputGroup>

      {/* Conditionally render the red + Assignment Button only if faculty */}
      {isFaculty && (
        <Button
          variant="danger"
          size="lg"
          className="me-1 float-end"
          id="wd-add-module-btn"
          onClick={handleAddClick}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </Button>
      )}

      {/* Displays grey Group button */}
      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-view-progress"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
    </div>
  );
}
