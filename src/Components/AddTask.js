import React from "react";
import { useState, useEffect } from "react";

const AddTask = ({onAdd}) => {
  // to get today date and set min attribute of datetime input as today
  const [dateToday, setDateToday] = useState("");
//   const [dateMax, setDateMax] = useState("");
  useEffect(() => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    //
    var hh = today.getHours();
    var m = today.getMinutes();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    if (hh < 10) {
      hh = "0" + hh;
    }

    if (m < 10) {
      m = "0" + m;
    }

    setDateToday(yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + m);

    // did it to set max date
    // const arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    // const maxx =
    //   yyyy + "-" + mm + "-" + ((dd + 6) % arr[mm - 1]) + "T" + hh + ":" + m;
    // setDateMax(maxx);
    console.log(dateToday, "UseEffect bola");
  });

  const [text, setText] = useState("");
  const [time, setTime] = useState("");
  const [reminder, setReminder] = useState(false);

  // when task is added to
  const onSubmit = (e) => {
    e.preventDefault();

    // handled it with required attribute
    if(!text){
        alert("Please enter task name");
        return
    }

    onAdd({text, time, reminder})

    setText("")
    setTime("")
    setReminder(false)
  }

//   max={dateMax} 
  return (
    <form className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type="text" placeholder="Add Task" required value={text} onChange={(e) => setText(e.target.value)}/>
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input type="datetime-local" min={dateToday} required value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
      </div>
      <input className="btn btn-block" type="submit" value="Save Task" />
    </form>
  );
};

export default AddTask;