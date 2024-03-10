import { nanoid } from "nanoid";
import { SetStateAction, useState } from "react";
import "./TaskManager.css";

// TODO: create custom hook to manage task state
export const TaskManager = () => {
  const [title, setTitle] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  

  // remove task from list
  const completeTask = (id:string) => {
    setTasks(tasks.filter((task: { id: string }) => task.id !== id));
    
  };

  const updateTask = (id:string, taskUpdate:string) => {
    const newTasks = tasks.slice();

    const index = tasks.findIndex((task:{id:string}) => task.id === id);

    newTasks[index].title = taskUpdate 

    setTasks(newTasks);
  };

  const addTask = () => {
    if (title.length < 1) {
      return;
    }

    const newTask:Task= {
      // using nanoid to generate unique id
      id: nanoid(),
      title,
    };
   
    
    setTasks((prevTasks)=>prevTasks.concat(newTask))
    setTitle("");
  };

  const handleSearch = (ev: { target: { value: SetStateAction<string>; }; }) => {
    setSearchKeyword(ev.target.value);
  };

  const filteredTasks = tasks.filter((task:{title:string}) =>
    task.title.toLowerCase().includes(searchKeyword.toLowerCase()),
  );

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <div>
        <input type="text" onChange={handleSearch} placeholder="Search Task" />
      </div>

      <div className="task">
        <input
          type="text"
          value={title}
          onChange={(ev) => {
            setTitle(ev.target.value);
          }}
        />

        <button onClick={addTask}>Add Task</button>
      </div>

      <ul className="container">
        {filteredTasks.map((task) => (
          <li key={task.id} className="task">
            <div className="task">
              <input
                type="text"
                placeholder="Add new task"
                value={task.title}
                onChange={(e) => updateTask(task.id,  e.target.value )}
              />
              <button onClick={() => completeTask(task.id)}>Done</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};