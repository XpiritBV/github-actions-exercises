const express = require('express');
const TodoController = require('../controllers/todoController');

function setRoutes(app) {
    const router = express.Router();
    const todoController = new TodoController();

    router.get('/', todoController.getTodos);
    router.get('/:id', todoController.getTodoById);
    router.post('/', todoController.createTodo);
    router.put('/:id', todoController.updateTodo);
    router.delete('/:id', todoController.deleteTodo);

    app.use('/todos', router);
}

module.exports = setRoutes;
