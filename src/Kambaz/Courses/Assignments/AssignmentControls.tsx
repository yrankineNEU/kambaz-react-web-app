import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Button, FormControl, InputGroup } from "react-bootstrap";

export default function AssignmentControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
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
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </Button>
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
