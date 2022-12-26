import { Link } from "react-router-dom";

const Instructions = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "30px",
        padding: "20px",
      }}
    >
      <h4 style={{ margin: "0px auto 15px auto" }}>About Taskify</h4>
      <p>
        Taskify is a <b>Todo</b> aka <b>Task management </b> app, which
        increases the overall productivity of the user by keeping track of all
        the tasks user needs to do.
      </p>
      <h4 style={{ margin: "30px auto 5px auto" }}>
        How to use Taskify (instructions)
      </h4>
      <ul className="how-to-use">
        <li>
          Click the <b>Add</b> and <b>Close</b> to toggle task form
        </li>
        <li>
          Add the task and timestamp till you want to complete or a timestamp at
          which you want to start working (you can it in both uses) and set
          reminder if you want a reminder when timer ends.
        </li>
        <li>
          To toggle the reminder of a task, <b>double click</b> the respective
          task. The <b>pink</b> border on the task means it's reminder is{" "}
          <b>on</b>.
        </li>
        <li>
          You can also mark a task as <b>completed</b> & <b>delete</b> it by
          clicking on the tickboxes on the right
        </li>
        <li>
          <b>The order of tasks shown on the dashboard is as follows:</b>
          <ol>
            <li>
              Tasks with <b>reminders</b>
            </li>
            <li>
              Tasks marked as <b>incomplete</b>
            </li>
            <li>
              Tasks in their <b>ascending order of time left</b>
            </li>
          </ol>
        </li>
      </ul>
      <h4 style={{ margin: "20px 0 -20px 0" }}>Version 1.0.0</h4>
      {/* <Link
        style={{
          textDecoration: "underline",
          color: "#5f5f60",
          cursor: "pointer",
          padding: "5px 10px",
        }}
        to="/"
      >
        Go Back
      </Link> */}
    </div>
  );
};

export default Instructions;
