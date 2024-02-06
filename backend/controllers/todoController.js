const Todo = require("../models/todo");

// Controller for handling the creation of a new todo
const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create a new todo instance
    const newTodo = new Todo({
      title,
      description,
    });
    // Save the todo to the database
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for getting all todos
// Controller for getting all todos
const getAllTodos = async (req, res) => {
  try {
    // Retrieve all todos from the database
    const todos = await Todo.find();
    res.status(200).json(todos); // Send the todos as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for updating a todo
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    // Find the todo by ID and update its fields
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { title, description, completed },
      { new: true } // Return the modified document
    );

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const deleteTodo = async (req, res) => {
  console.log("hello , let's start to delete the data");

  try {
    const { id } = req.params;
    console.log("Deleting task with id:", id);

    // Find the todo by ID and remove it
    await Todo.findByIdAndDelete(id);
    console.log("Task deleted successfully!");
    res.status(204).end(); // No content in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
};
