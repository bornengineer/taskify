import { useState, useEffect } from "react";
import AddTask from "./Components/AddTask";
import Header from './Components/Header'
import Tasks from './Components/Tasks'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggleComplete = async (id) => {
    // console.log("Toggle", id)
    // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))

    // for json server connnectivity
    const taskToToggle = await fetchTask(id)

    const updatedTask = { ...taskToToggle, complete: !taskToToggle.complete }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, complete: data.complete } : task))
  }



  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json();
    return data
  }

  //add task
  const addTask = async (task) => {
    // // console.log(task)
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask]);

    // later wrote this to add json-server
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
    const data = await res.json()

    setTasks([...tasks, data])
  }

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  // now to toggle the reminder in json-server also 

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json();
    return data
  }

  const reminderOff = async (id) => {
    let taskToToggle = await fetchTask(id)

    let updatedTask = { ...taskToToggle, reminder: false }

    let res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })

    let data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))

    console.log("reminderoff")
  }


  const toggleReminder = async (id) => {
    // console.log("Toggle", id)
    // setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))

    // for json server connnectivity
    const taskToToggle = await fetchTask(id)

    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  // 2022-02-06T17:00
  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      // console.log(tasksFromServer[0].time + " task from server")
      const minutesFirst = tasksFromServer.sort((a, b) => a.time.slice(14, 16) - b.time.slice(14, 16));
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
