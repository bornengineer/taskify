import { useState } from "react";

const Timer = ({ timee, reminderOff, task }) => {
  // The data/time we want to countdown to
  var countDownDate = new Date(timee).getTime();

  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const [timeup, setTimeup] = useState("");

  //   console.log(countDownDate," countdown")

  var days, hours, minutes, seconds;
  // Run myfunc every second

  // var alerted = false;

  const myfunc = setInterval(function () {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;
    // console.log(timeleft, " timeleft...");

    // 👇️ take parameter passed from Child component

    // Calculating the days, hours, minutes and seconds left
    days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    days.toString();
    hours.toString();
    minutes.toString();
    seconds.toString();

    if (parseInt(days) < 10) days = "0" + days;
    if (parseInt(hours) < 10) hours = "0" + hours;
    if (parseInt(minutes) < 10) minutes = "0" + minutes;
    if (parseInt(seconds) < 10) seconds = "0" + seconds;

    // Result is output to the specific element
    days = "Time left: " + days + "d ";
    hours = hours + "h ";
    minutes = minutes + "m ";
    seconds = seconds + "s ";

    setDay(days);
    setHour(hours);
    setMin(minutes);
    setSec(seconds);

    // // Result is output to the specific element
    // document.getElementById("days").innerHTML = days + "d ";
    // document.getElementById("hours").innerHTML = hours + "h ";
    // document.getElementById("mins").innerHTML = minutes + "m ";
    // document.getElementById("secs").innerHTML = seconds + "s ";

    // Display the message when countdown is over
    if (timeleft < 0) {
      // console.log("end the interval");
      clearInterval(myfunc);
      //   document.getElementById("days").innerHTML = "";
      //   document.getElementById("hours").innerHTML = "";
      //   document.getElementById("mins").innerHTML = "";
      //   document.getElementById("secs").innerHTML = "";
      // document.getElementById("end").innerHTML = "TIME UP!!";
      setDay("");
      setHour("");
      setMin("");
      setSec("");
      setTimeup("Time Up!");
      // if (timeleft<0 && task.reminder) {
      //   reminderOff(task.id);
      //   // console.log(task.text + "'s time has begun");
      //   // alerted = true;
      // }
    }
  }, 1000);
  return (
    <div style={{ display: "flex", width: "300px" }}>
      <p style={{ display: "flex", marginRight: "5px" }}>{day}</p>
      <p style={{ margin: "0px 5px" }}>{hour}</p>
      <p style={{ margin: "0px 5px" }}>{min}</p>
      <p style={{ margin: "0px 5px" }}>{sec}</p>
      <p style={{ width: "70px", marginLeft: "-34px" }}>{timeup}</p>
    </div>
  );
};

export default Timer;
