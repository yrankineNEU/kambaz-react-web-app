import { useState } from "react";
import { FormControl } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });

  const [module, setModule] = useState({
    id: "CS5610",
    name: "Web Development",
    description: "Learn modern web development with React and Node.js",
    course: "CS5610",
  });

  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/Lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/Lab5/module`;

  return (
    <div>
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <hr />
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <hr />
      {/* Score */}
      <div className="mb-3">
        <label>Score:</label>
        <div className="input-group">
          <FormControl
            type="number"
            className="form-control"
            value={assignment.score}
            onChange={(e) =>
              setAssignment({
                ...assignment,
                score: parseInt(e.target.value) || 0,
              })
            }
          />
          <a
            className="btn btn-primary"
            href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
          >
            Update Score
          </a>
        </div>
      </div>

      {/* Completed */}
      <div className="mb-3">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            checked={assignment.completed}
            onChange={(e) =>
              setAssignment({ ...assignment, completed: e.target.checked })
            }
          />
          <label className="form-check-label">Completed</label>
          <a
            className="btn btn-primary ms-2"
            href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
          >
            Update Completed
          </a>
        </div>
      </div>

      <hr />

      {/* Module Section */}
      <h4>Module</h4>
      <h5>Retrieving Objects</h5>
      <a className="btn btn-primary me-2" href={`${MODULE_API_URL}`}>
        Get Module
      </a>
      <hr />

      <h5>Retrieving Properties</h5>
      <a className="btn btn-primary me-2" href={`${MODULE_API_URL}/name`}>
        Get Module Name
      </a>
      <hr />

      <h5>Modifying Properties</h5>

      {/* Module Name */}
      <div className="mb-3">
        <label>Module Name:</label>
        <div className="input-group">
          <FormControl
            className="form-control"
            value={module.name}
            onChange={(e) => setModule({ ...module, name: e.target.value })}
          />
          <a
            className="btn btn-primary"
            href={`${MODULE_API_URL}/name/${module.name}`}
          >
            Update Name
          </a>
        </div>
      </div>

      {/* Module Description */}
      <div className="mb-3">
        <label>Module Description:</label>
        <div className="input-group">
          <FormControl
            as="textarea"
            rows={3}
            className="form-control"
            value={module.description}
            onChange={(e) =>
              setModule({ ...module, description: e.target.value })
            }
          />
          <a
            className="btn btn-primary"
            href={`${MODULE_API_URL}/description/${module.description}`}
          >
            Update Description
          </a>
        </div>
      </div>

      <hr />
    </div>
  );
}
