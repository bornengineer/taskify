import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AddTask from "./Components/AddTask";
import Header from "./Components/Header";
import Tasks from "./Components/Tasks";
import Footer from "./Components/Footer";
import Instructions from "./Components/Instructions";
import { FontAwesomeIcon } from "react-icons/fa";
import Swal from "sweetalert2";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [save, setSave] = useState(false);

  const addTaskToLocalStorage = (items) => {
    localStorage.setItem("react-tasks", JSON.stringify(items));
  };

  //add task
  const addTask = (task) => {
    // // console.log(task)
    // writing this in last to add the localStorage Feature

    // Swal.fire({
    //   position: "center",
    //   icon: "success",
    //   title: "Task added successfully",
    //   showConfirmButton: false,
    //   timer: 2000,
    //   width: "450px",
    //   footer: "Thank you for Using Taskify",
    //   customClass: { container: "margin-right" },
    // });
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Task added successfully'
    })

    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    const newTasks = [...tasks, newTask];
    addTaskToLocalStorage(newTasks);
    setTasks(newTasks);
    setShowAddTask(false);

    // later wrote this to add json-server
    // const res = await fetch(`http://localhost:5000/tasks`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(task),
    // })
    // const data = await res.json()

    // setTasks([...tasks, data])
  };

  const toggleComplete = (id) => {
    // console.log("Toggle", id)
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    addTaskToLocalStorage(newTasks);
    setTasks(newTasks);
    setSave(!save);
    // for json server connnectivity
    // const taskToToggle = await fetchTask(id)

    // const updatedTask = { ...taskToToggle, complete: !taskToToggle.complete }

    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedTask)
    // })

    // const data = await res.json()

    // setTasks(tasks.map((task) => task.id === id ? { ...task, complete: data.complete } : task))
  };

  // now to toggle the reminder in json-server also
  const toggleReminder = (id) => {
    // console.log("Toggle", id)
    // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))

    // writing in last for localStorage
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    );
    setTasks(newTasks);
    addTaskToLocalStorage(newTasks);
    setSave(!save);

    // for json server connnectivity
    // const taskToToggle = await fetchTask(id)

    // const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    // const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedTask)
    // })

    // const data = await res.json()

    // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  };

  const reminderOff = (id) => {
    // commenting cause its not currently in use
    // let taskToToggle = await fetchTask(id)
    // let updatedTask = { ...taskToToggle, reminder: false }
    // let res = await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(updatedTask)
    // })
    // let data = await res.json()
    // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
    // console.log("reminderoff")
  };

  // Fetch tasks
  // const fetchTasks = async () => {
  //   const res = await fetch('http://localhost:5000/tasks')
  //   const data = await res.json();
  //   return data
  // }

  // const fetchTask = async (id) => {
  //   const res = await fetch(`http://localhost:5000/tasks/${id}`)
  //   const data = await res.json();
  //   return data
  // }

  const deleteTask = (id) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    addTaskToLocalStorage(newTasks);
    setTasks(newTasks);
    setSave(!save);

    // await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'DELETE',
    // })
    // setTasks(tasks.filter((task) => task.id !== id))
  };

  // 2022-02-06T17:00
  const getTasks = async () => {
    // for json-server
    // const tasksFromServer = await fetchTasks();

    // for localStorage
    const tasksFromLocalStorage = JSON.parse(
      localStorage.getItem("react-tasks")
    );

    // console.log("get hogaye chala", tasksFromLocalStorage)
    // console.log(tasksFromServer[0].time + " task from server")

    const minutesFirst = tasksFromLocalStorage.sort(
      (a, b) => a.time.slice(14, 16) - b.time.slice(14, 16)
    );
    const hoursFirst = minutesFirst.sort(
      (a, b) => a.time.slice(11, 13) - b.time.slice(11, 13)
    );
    const daysFirst = hoursFirst.sort(
      (a, b) => a.time.slice(8, 10) - b.time.slice(8, 10)
    );
    const nonCompleteFirst = daysFirst.sort((a, b) => a.complete - b.complete);

    const reminderFirst = nonCompleteFirst.sort(
      (a, b) => b.reminder - a.reminder
    );

    setTasks(reminderFirst);
  };

  useEffect(() => {
    getTasks();
  }, [save]);

  return (
    <>
      <div className="container">
        <Header
          toggleAdd={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Routes>
          <Route
            path="/"
            element={(
              <>
                {showAddTask && (
                  <AddTask onAdd={addTask} setSave={setSave} save={save} />
                )}
                {tasks.length > 0 ? (
                  <div>
                    <p style={{ padding: "0px 0px 10px 0px" }}>
                      &nbsp;Double click a task to toggle reminder
                    </p>
                    <Tasks
                      tasks={tasks}
                      onDelete={deleteTask}
                      onToggle={toggleReminder}
                      reminderOff={reminderOff}
                      toggleComplete={toggleComplete}
                    />
                  </div>

                ) : (
                  "No tasks to show"
                )}
              </>
            )}
          />
          <Route path="/instructions" element={<Instructions />} />
        </Routes>
        <Footer />
      </div>
      <div className="social-links">
        <a href="https://amaank.me/" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 21 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" /></svg>
        </a>

        <a href="https://www.linkedin.com/in/amaan0/" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" /></svg>
        </a>

        <a href="https://github.com/bornengineer" target="_blank">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" /></svg>
        </a>

      </div>
    </>
  );
}

export default App;
