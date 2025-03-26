import { useState } from "react";

function CompletedTask() {
  const [allTask, setAllTask] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/all-completed-task");
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const tasks = await response.json();
      setAllTask(tasks?.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-black font-bold p-4 max-w-2xl mx-auto">
      <h2 className="text-xl mb-4 text-center">Completed Tasks</h2>
      
      <button 
        onClick={fetchTasks} 
        className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto block mx-auto"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Completed Tasks"}
      </button>

      <ul className="mt-4 space-y-3">
        {allTask.length > 0 ? (
          allTask.map((task) => (
            <li key={task._id} className="p-3 border border-gray-300 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="text-gray-700">{task.description}</p>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-600">No completed tasks available</p>
        )}
      </ul>
    </div>
  );
}

export default CompletedTask;