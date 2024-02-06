const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todoController");

// Route for creating a new todo
router.post("/todos", todoController.createTodo);

// Route for getting all todos
router.get("/todos", todoController.getAllTodos);

// // Route for updating a todo
router.put("/todos/:id", todoController.updateTodo);

// // Route for deleting a todo
router.delete("/todos/:id", todoController.deleteTodo);

module.exports = router;
