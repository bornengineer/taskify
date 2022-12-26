import { FaCheckSquare, FaTrash } from "react-icons/fa";

import Timer from "./Timer";

const Task = ({ tasks, task, onDelete, onToggle, toggleComplete }) => {
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

  const timee =
    timeString.slice(8, 10) +
    " " +
    months[parseInt(timeString.slice(5, 7)) - 1] +
    " " +
    timeString.slice(0, 4) +
    " at " +
    timeString.slice(11, 16);

  const timerTime =
    months[parseInt(timeString.slice(5, 7)) - 1] +
    " " +
    timeString.slice(8, 10) +
    ", " +
    timeString.slice(0, 4) +
    " " +
    timeString.slice(11, 16) +
    ":00";

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: "0px",
        }}
        className="task taskCont"
      >
        <div
          className={`task ${task.reminder ? "reminder" : ""} ${
            task.complete ? "completed" : ""
          }`}
          style={{
            width: "350px",
            display: "flex",
            height: "auto",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onDoubleClick={() => onToggle(task.id)}
        >
          <div style={{ fontSize: "17px", fontWeight: "bold" }}>
            {task.text}
          </div>
          <p>{timee}</p>
          {!task.complete && (
            <>
              <Timer task={task} timee={timerTime} />
            </>
          )}
        </div>
        <div
          style={{
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginRight: "20px",
            background: "#f4f4f4",
          }}
        >
          {task.complete ? (
            <FaCheckSquare
              style={{ color: "green", cursor: "pointer" }}
              onClick={() => toggleComplete(task.id)}
            />
          ) : (
            <FaCheckSquare
              style={{ color: "gray", cursor: "pointer" }}
              onClick={() => toggleComplete(task.id)}
            />
          )}
          <FaTrash
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(task.id)}
          />
        </div>
      </div>
    </>
  );
};

export default Task;
