import { useState } from "react";

function TasksCards({ tit, des, id }) {
  const [isChecked, setIsChecked] = useState(false); 

  function handleChange() {
    setIsChecked(!isChecked);
  }

  async function handleCompletion() {
    const dataForPut = {
      title: tit,
      description: des,
      completed: true,
    };

    try {
      const response = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForPut),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const data = await response.json();
      if (!data.success) {
        console.error("Task update failed");
        return;
      }

      alert("Task Completed");
    } catch (error) {
      console.error("Error completing task:", error);
    }
  }

  return (
    !tit?.trim() && !des?.trim() ? null : ( 
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <div className="p-5 border border-gray-200 rounded-md bg-gray-50">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">{tit}</h1>
          <p className="text-sm md:text-base text-gray-600 mt-2">{des}</p>
        </div>
        <div className="flex items-center space-x-3 mt-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 cursor-pointer"
          />
          <label className="text-gray-700 text-base cursor-pointer">Mark as Completed</label>
        </div>
        {isChecked && (
          <button
            onClick={handleCompletion}
            className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Confirm Completion
          </button>
        )}
      </div>
    )
  );
}

export default TasksCards;
