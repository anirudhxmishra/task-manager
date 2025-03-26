import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css"; 
import ShowAllTask from "./Components/ShowAllTasks";
import TasksCards from "./Components/TaskCards";
import CompletedTask from "./Components/CompletedTask";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "", completed: false });

  useEffect(() => {
    axios.get("http://localhost:3000/api/tasks")
      .then((res) => setTasks(Array.isArray(res.data) ? res.data : []))
      .catch(() => setTasks([]));
  }, []);

  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setTask((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const addTask = () => {
    if (!task.title.trim() || !task.description.trim()) return;
    axios.post("http://localhost:3000/api/tasks", task)
      .then((res) => {
        setTasks([...tasks, res.data]);
        setTask({ title: "", description: "", completed: false });
      })
      .catch(console.error);
  };

  const toggleTask = (id, completed) => {
    axios.put(`http://localhost:3000/api/tasks/${id}`, { completed: !completed })
      .then(() => {
        setTasks(tasks.map(t => t._id === id ? { ...t, completed: !completed } : t));
      })
      .catch(console.error);
  };


  const deleteTask = (id) => {
    axios.delete(`http://localhost:3000/api/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(t => t._id !== id));
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center bg-black-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Task Manager</h2>

        <div className="flex flex-col space-y-2">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={task.title}
            onChange={changeHandler}
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={task.description}
            onChange={changeHandler}
            className="p-2 border rounded"
          />
          <button onClick={addTask} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add Task
          </button>
        </div>

        <ul className="mt-4 space-y-3">
          {tasks.map((t) => (
            <li key={t._id} className={`p-3 border rounded flex flex-col items-center shadow-sm ${t.completed ? "line-through opacity-50" : ""}`}>
              <strong className="text-lg">{t.title}</strong>
              <p className="text-gray-600">{t.description}</p>
              <div className="text-xs text-gray-500">
                <span>Created: {new Date(t.createdAt).toLocaleString()}</span>
                <br />
                <span>Updated: {new Date(t.updatedAt).toLocaleString()}</span>
              </div>
              <div className="mt-2 flex space-x-2">
                <button onClick={() => toggleTask(t._id, t.completed)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                  ✔
                </button>
                <button onClick={() => deleteTask(t._id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
       
      </div>

      <ShowAllTask />
      <TasksCards  />
      <CompletedTask />
    </div>
  );
}
