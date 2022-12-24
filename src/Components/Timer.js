import { useState } from "react";

const Timer = ({ timee }) => {
  // The date/time we want to countdown to
  var countDownDate = new Date(timee).getTime();

  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const [timeup, setTimeup] = useState("");

  // Run myfunc every second
  const myfunc = setInterval(function () {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;

    var days, hours, minutes, seconds;
    // Calculating the days, hours, minutes and seconds left
    days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((timeleft % (1000 * 60)) / 1000);

    days.toString();
    hours.toString();
    minutes.toString();
    seconds.toString();

    // parseInt converts string to int
    if (parseInt(days) < 10) days = "0" + days;
    if (parseInt(hours) < 10) hours = "0" + hours;
    if (parseInt(minutes) < 10) minutes = "0" + minutes;
    if (parseInt(seconds) < 10) seconds = "0" + seconds;

    days = "Time left: " + days + "d ";
    hours = hours + "h ";
    minutes = minutes + "m ";
    seconds = seconds + "s ";

    setDay(days);
    setHour(hours);
    setMin(minutes);
    setSec(seconds);

    // Display the message when countdown is over
    if (timeleft <= 0) {
      clearInterval(myfunc.current);
      setDay("");
      setHour("");
      setMin("");
      setSec("");
      setTimeup("Time Up!");
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
