import { FaTimes } from "react-icons/fa";
const Task = ({ task, onDelete, onToggle }) => {
  //  0123456789
  // 2022-02-06T17:00
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  let timeString = task.time || "";
  console.log(timeString + " ham bole")
  const timee =
    timeString.slice(8, 10) +
    " " +
    months[parseInt(timeString.slice(5, 7)) - 1] +
    " " +
    timeString.slice(0, 4) +
    " at " +
    timeString.slice(11, 16);
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task.id)}
        />
      </h3>
      <p>{timee}</p>
    </div>
  );
};

export default Task;
