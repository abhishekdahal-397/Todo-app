import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [descriptionInput, setDescriptionInput] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks().finally(() => setLoading(false));
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/todos");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error; // Re-throw the error to be caught in the calling code
    }
  };

  const fetchTaskById = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/todos/${id}`);
      setTaskInput(response.data.title);
      setDescriptionInput(response.data.description);
      setUpdateId(id);
    } catch (error) {
      console.error(`Error fetching task with id ${id}:`, error);
    }
  };

  const addTask = async () => {
    if (taskInput.trim() !== "") {
      try {
        if (updateId !== null) {
          // Update existing task
          await axios.put(`http://localhost:3001/api/todos/${updateId}`, {
            title: taskInput,
            description: descriptionInput,
          });
        } else {
          // Add new task
          await axios.post("http://localhost:3001/api/todos", {
            title: taskInput,
            description: descriptionInput,
          });
        }
        await fetchTasks();
        setTaskInput("");
        setDescriptionInput("");
        setUpdateId(null);
      } catch (error) {
        console.error("Error adding/updating task:", error);
      }
    }
  };

  const deleteTask = async (id) => {
    try {
      console.log("deleting task with id :", id);
      await axios.delete(`http://localhost:3001/api/todos/${id}`);
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = (id) => {
    fetchTaskById(id);
    setUpdateId(id);
  };

  return (
    <div className="container">
      <h1>My Todo List</h1>
      <form>
        <label htmlFor="taskInput">Title:</label>
        <input
          type="text"
          id="taskInput"
          name="taskInput"
          placeholder="Enter your task title"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <label htmlFor="descriptionInput">Description:</label>
        <textarea
          id="descriptionInput"
          name="descriptionInput"
          placeholder="Enter your task description"
          value={descriptionInput}
          onChange={(e) => setDescriptionInput(e.target.value)}
        />
        <button type="button" onClick={addTask}>
          {console.log(tasks)}
          {console.log(tasks._id)}
          {console.log(tasks._id)}
          {updateId !== null ? "Update Task" : "Add Task"}
        </button>
      </form>
      <ul>
        {loading ? (
          <li>Loading...</li>
        ) : (
          tasks.map((task) => (
            <li key={task._id}>
              <strong>{task.title}</strong>
              <div className="lists">{task.description}</div>
              <button type="button" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
              <button type="button" onClick={() => updateTask(task._id)}>
                Update
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;

