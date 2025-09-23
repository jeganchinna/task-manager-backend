import React, { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Add new task or update existing one
  const handleAddOrUpdate = () => {
    if (!newTask.trim()) return; // prevent empty tasks

    if (editingIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editingIndex] = { text: newTask };
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: newTask }]);
    }

    setNewTask(""); // clear input
  };

  // Delete task
  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Edit task
  const handleEdit = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Task Manager</h1>

      <div className="flex mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter new task"
          className="flex-grow border rounded px-2 py-1 mr-2"
        />
        <button
          onClick={handleAddOrUpdate}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          {editingIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      <div>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks added yet</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
            >
              <span>{task.text}</span>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  className="text-yellow-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-600"
                >
                  ❌
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
