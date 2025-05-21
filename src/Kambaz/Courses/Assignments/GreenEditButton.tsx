import { MdEditNote } from "react-icons/md";

export default function GreenEditButton() {
  return (
    <span className="me-1 position-relative">
      <MdEditNote style={{ top: "2px" }} className="text-success me-1" />
    </span>
  );
}
