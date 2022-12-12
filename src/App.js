import { useState } from "react";
import Header from './Components/Header'
import Tasks from './Components/Tasks'

function App() {
  const [tasks, setTasks] = useState([
    { 
      id : 1,
      text: "Shop grocery",
      time: "Feb 6th at 6:00pm",
      reminder: true,
    },
    { 
      id : 2,
      text: "Get Placed",
      time: "Dec 13th at 2:00am",
      reminder: true,
    },
    { 
      id : 3,
      text: "Complete React App",
      time: "Dec 14th at 1:00am",
      reminder: true,
    }
  ]);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }
  return (
    <div className="container">
        <Header />
        {tasks.length>0 ? <Tasks tasks = {tasks} onDelete={deleteTask}/> : <h3>No tasks to show</h3>}
    </div>
  );
}

export default App;
