const TodoModel = require('../models/todoModel');

class TodoController {
    constructor() {
        this.todos = [];
    }

    createTodo(description) {
        const newTodo = new TodoModel(description);
        this.todos.push(newTodo);
        return newTodo;
    }

    getTodos() {
        return this.todos;
    }

    getTodoById(id) {
        return this.todos.find(todo => todo.id === id);
    }

    updateTodo(id, description, completed) {
        const todo = this.getTodoById(id);
        if (todo) {
            todo.description = description;
            todo.completed = completed;
            return todo;
        }
        return null;
    }

    deleteTodo(id) {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
            return true;
        }
        return false;
    }
}

module.exports = TodoController;