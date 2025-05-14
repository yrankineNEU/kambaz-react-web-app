import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <table id="wd-home">
      <button>Collapse All</button>
      <button>View Progress</button>
      <select id="wd-select-module">
        <option value="Course 1">Course1</option>
        <option value="Course 2">Course2</option>
        <option selected value="Publish-All">
          Publish All
        </option>
      </select>
      <button>+ Module</button>
      <tr>
        <td valign="top">
          <Modules />
        </td>
        <td valign="top">
          <CourseStatus />
        </td>
      </tr>
    </table>
  );
}
