import { useSelector } from "react-redux";
import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div className="d-flex" id="wd-home">
      <div className="flex-fill me-3">
        <Modules isFaculty={isFaculty} />
      </div>
      <div className="d-none d-xl-block">
        <CourseStatus />
      </div>
    </div>
  );
}
