import Task from './Task'
const Tasks = ({tasks, onDelete, onToggle, reminderOff, onComplete, toggleComplete}) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} onDelete = {onDelete} onToggle={onToggle} reminderOff={reminderOff} onComplete={onComplete} toggleComplete={toggleComplete}/>
      ))}
    </>
  );
};

export default Tasks;
