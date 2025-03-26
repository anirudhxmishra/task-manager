import { useEffect, useState } from "react";
import TasksCards from "./TaskCards";

function ShowAllTask() {
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/tasks");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const tasks = await response.json();
        setAllTask(tasks.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  console.log("all tasks okk", allTask);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">All Tasks</h2>
      {allTask.length ? (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allTask.map((task) => (
            <li key={task._id} className="bg-white shadow-md rounded-lg p-4">
              <TasksCards tit={task.title} des={task.description} id={task._id} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-4">No tasks available</p>
      )}
    </div>
  );
}

export default ShowAllTask;
