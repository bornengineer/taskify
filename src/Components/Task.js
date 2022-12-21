import { useState } from "react";
import { FaCheckSquare, FaTrash } from "react-icons/fa";

import Timer from "./Timer";

const Task = ({ task, onDelete, onToggle, reminderOff, onComplete }) => {
  var alerted = false;
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

  const [complete, setComplete] = useState(false);

  let timeString = task.time || "";
  // console.log(timeString + " ham bole");
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

  const myfun = function (num) {
    // 👇️ take parameter passed from Child component
    if (num < 0 && task.reminder && !alerted) {
      reminderOff(task.id);
      alert(task.text + "'s time has begun");
      alerted = true;
    }
  };

  return (
    <>
      <div
        style={{
          height: "90px",
          // width: "430px",
          display: "flex",
          flexDirection: "row",
          justifyContent:"space-between",
          padding: "0px",
        }}
        className="task taskCont"
      >
        <div
          className={`task ${task.reminder ? "reminder" : ""} ${
            complete ? "completed" : ""
          }`}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          onDoubleClick={() => onToggle(task.id)}
        >
          <h3>{task.text}</h3>
          <p>{timee}</p>
          {!complete && (
            <>
              <Timer timee={timerTime} handleClick={myfun} />
            </>
          )}
        </div>
        <div
          style={{
            fontSize: "18px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            marginRight:"20px",
            // border:"1px solid rgba(0,0,0,1)",
            background: "#f4f4f4",
          }}
        >
          <FaCheckSquare
            style={{ color: "green", cursor: "pointer" }}
            onClick={() => onComplete(setComplete(!complete))}
          />
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
