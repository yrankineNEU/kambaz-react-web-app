import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function AssignmentControls() {
  const navigate = useNavigate();

  const handleAddAssignment = () => {
    // Navigate to the AssignmentEditor screen
    navigate("Editor");
  };

  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <InputGroup
        className="position-relative me-2"
        style={{ maxWidth: "400px" }}
      >
        <InputGroup.Text>
          <FaSearch />
        </InputGroup.Text>
        <FormControl placeholder="Search..." />
      </InputGroup>

      <Button
        variant="danger"
        onClick={handleAddAssignment}
        size="lg"
        className="me-1 float-end"
        id="wd-add-assignment-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>

      <Button
        variant="secondary"
        size="lg"
        className="me-1 float-end"
        id="wd-add-group-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </Button>
    </div>
  );
}
