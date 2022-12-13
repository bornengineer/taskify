import { useState } from "react";
import AddTask from "./Components/AddTask";
import Header from './Components/Header'
import Tasks from './Components/Tasks'

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    // { 
    //   id : 1,
    //   text: "Shop grocery",
    //   time: "2022-02-06T17:00",
    //   reminder: true,
    // },
    // { 
    //   id : 2,
    //   text: "Get Placed",
    //   time: "2017-06-01T08:30",
    //   reminder: true,
    // },
    // { 
    //   id : 3,
    //   text: "Complete React App",
    //   time: "2017-06-30T16:30",
    //   reminder: false,
    // }
  ]);
  //add task
  const addTask = (task) => {
    // console.log(task)
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task }

    setTasks([...tasks, newTask]);
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const toggleReminder = (id) => {
    // console.log("Toggle", id)
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <div className="container">
      <Header toggleAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : <h3>No tasks to show</h3>}
    </div>
  );
}

export default App;
