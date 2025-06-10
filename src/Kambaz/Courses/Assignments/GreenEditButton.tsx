import { MdEditNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface GreenEditButtonProps {
  aid: string;
  cid: string;
}

export default function GreenEditButton({ aid, cid }: GreenEditButtonProps) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`/Kambaz/Courses/${cid}/Assignments/${aid}`);
  }

  return (
    <span
      className="me-1 position-relative"
      style={{ cursor: "pointer" }}
      onClick={handleClick}
      title="Edit Assignment"
    >
      <MdEditNote style={{ top: "2px" }} className="text-success me-1" />
    </span>
  );
}
