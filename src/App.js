import { useState, useEffect } from "react";
import AddTask from "./Components/AddTask";
import Header from './Components/Header'
import Tasks from './Components/Tasks'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const addTaskToLocalStorage = (items) => {
    localStorage.setItem("react-tasks", JSON.stringify(items))
  };

  //add task
  const addTask = async (task) => {
    // // console.log(task)
    // writing this in last to add the localStorage Feature
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task }
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    addTaskToLocalStorage(newTasks);

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
  }

  const toggleComplete = async (id) => {
    // console.log("Toggle", id)
    const newTasks = tasks.map((task) => task.id === id ? { ...task, complete: !task.complete } : task);
    setTasks(newTasks)
    addTaskToLocalStorage(newTasks)

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
  }

  // now to toggle the reminder in json-server also 
  const toggleReminder = async (id) => {
    // console.log("Toggle", id)
    // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))

    // writing in last for localStorage
    const newTasks = tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task);
    setTasks(newTasks)
    addTaskToLocalStorage(newTasks)

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
  }

  const reminderOff = async (id) => {
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

    console.log("reminderoff")
  }

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

  const deleteTask = async (id) => {
    const newTasks = tasks.filter((task) => task.id !== id)
    setTasks(newTasks)
    addTaskToLocalStorage(newTasks);

    // await fetch(`http://localhost:5000/tasks/${id}`, {
    //   method: 'DELETE',
    // })
    // setTasks(tasks.filter((task) => task.id !== id))
  }

  // 2022-02-06T17:00
  useEffect(() => {
    const getTasks = async () => {
      // for json-server
      // const tasksFromServer = await fetchTasks();

      // for localStorage
      const tasksFromLocalStorage = JSON.parse(
        localStorage.getItem("react-tasks")
      );

      // console.log(tasksFromServer[0].time + " task from server")
      const minutesFirst = tasksFromLocalStorage.sort((a, b) => a.time.slice(14, 16) - b.time.slice(14, 16));
      const hoursFirst = minutesFirst.sort((a, b) => a.time.slice(11, 13) - b.time.slice(11, 13));
      const daysFirst = hoursFirst.sort((a, b) => a.time.slice(8, 10) - b.time.slice(8, 10));
      const nonCompleteFirst = daysFirst.sort((a, b) => a.complete - b.complete);
      const reminderFirst = nonCompleteFirst.sort((a, b) => b.reminder - a.reminder);
      setTasks(reminderFirst);
    }

    getTasks();
  }, [tasks]);

  return (
    <>
      <div className="container">
        <Header toggleAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? <><p style={{ padding: "0px 0px 10px 0px" }}>&nbsp;Double click a task to toggle reminder</p><Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} reminderOff={reminderOff} toggleComplete={toggleComplete} /> </> : <h3>No tasks to show</h3>}
      </div>
    </>
  );
}

export default App;
