import { useState, useEffect } from "react";
import AddTask from "./Components/AddTask";
import Header from './Components/Header'
import Tasks from './Components/Tasks'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }

    getTasks();
  }, []);

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

    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: false} : task))

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

  return (
    <>
      <div className="container">
        <Header toggleAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ? <><p style={{ padding: "0px 0px 10px 0px" }}>&nbsp;Double click a task to toggle reminder</p><Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} reminderOff={reminderOff} /> </> : <h3>No tasks to show</h3>}
      </div>
    </>
  );
}

export default App;
