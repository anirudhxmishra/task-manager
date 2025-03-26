const express = require("express");
const router = express.Router();

const { createTodo } = require("../controller/createTodo");
const { getTodo, getTodoById } = require("../controller/getTodo");
const { updateTodo } = require("../controller/updateTodo");
const { deleteTodo } = require("../controller/deleteTodo");

const { getCompletedTasks } = require("../controller/CompletedTask");

router.post("/tasks", createTodo);
router.get("/tasks", getTodo);
router.get("/getTodo/:id", getTodoById);
router.put("/tasks/:id", updateTodo);
router.delete("/tasks/:id", deleteTodo);

router.get("/all-completed-task", getCompletedTasks);

module.exports = router;
