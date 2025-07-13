const { getTodos, addTodo, deleteTodo } = require('../Controllers/TodoController');
const { authMiddleware } = require('../Middlewares/AuthMiddleware');

const router = require('express').Router();

router.get("/todos", authMiddleware, getTodos);
router.post("/todos", authMiddleware, addTodo);
router.delete("/todos/:id", authMiddleware, deleteTodo);

module.exports = router; 