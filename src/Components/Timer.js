import { useState, useEffect } from "react";
import Swal from "sweetalert2";

const Timer = ({ task, timee }) => {
  useEffect(() => {
    timerr();
  });

  // The date / time we want to countdown to
  var countDownDate = new Date(timee).getTime();

  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [sec, setSec] = useState("");
  const [timeup, setTimeup] = useState("");

  // Run myfunc every second
  let intervalId = null;
  const timerr = function () {
    var now = new Date().getTime();
    var timeleft = countDownDate - now;

    if (Math.floor(timeleft / 1000) === 0 && task.reminder) {
      // Swal.fire({
      //   title: task.text + "'s time has started/ended!!!",
      //   showClass: {
      //     popup: "animate__animated animate__fadeInDown",
      //   },
      //   hideClass: {
      //     popup: "animate__animated animate__fadeOutUp",
      //   },
      // });
      Swal.fire({
        title: task.text + "'s time has started/ended!!!",
        width: 600,
        padding: "3em",
        icon: "info",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        customClass: { container: "margin-right" },
        backdrop: `
            rgba(0,0,123,0.4)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
          `,
      });
    }

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
      clearInterval(intervalId);
      setDay("");
      setHour("");
      setMin("");
      setSec("");
      setTimeup("Time Up!");
      return;
    }
  };

  intervalId = setInterval(timerr, 1000);

  // useEffect(() => {
  //   if (
  //     setDay === "" &&
  //     setHour === "" &&
  //     setMin === "" &&
  //     setSec === "" &&
  //     timeup === ""
  //   ) {
  //     Swal.fire({
  //       title: "Time Up!",
  //       width: 600,
  //       padding: "3em",
  //       color: "#716add",
  //       background: "#fff url(/images/trees.png)",
  //       backdrop: `
  //           rgba(0,0,123,0.4)
  //           url("/images/nyan-cat.gif")
  //           left top
  //           no-repeat
  //         `,
  //     });
  //   }
  // }, [timeup]);

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
