const assert = require('assert');
const TodoController = require('../src/controllers/todoController');
const TodoModel = require('../src/models/todoModel');

describe('TodoController', function() {
  describe('#create()', function() {
    it('should create a new TODO item', function() {
      const controller = new TodoController();
      controller.createTodo(123, 'Test TODO item', false);
      assert.strictEqual(controller.todos.length, 1);
    });
  });

  describe('#read()', function() {
    it('should read a TODO item', function() {
      const controller = new TodoController();
      const model = controller.createTodo(123, 'Test TODO item', false);
      const readModel = controller.getTodoById(123);
      assert.strictEqual(readModel, model);
    });
  });

  describe('#update()', function() {
    it('should update a TODO item', function() {
      const controller = new TodoController();
      controller.createTodo(123, 'Test TODO item', false);
      const updatedModel = controller.updateTodo(123, 'update TODO item', true);
      assert.strictEqual(controller.todos[0], updatedModel);
    });
  });

  describe('#delete()', function() {
    it('should delete a TODO item', function() {
      const controller = new TodoController();
      controller.createTodo(123, 'Test TODO item 1', false);
      controller.createTodo(456, 'Test TODO item 2', false);
      controller.deleteTodo(123);
      assert.strictEqual(controller.todos.length, 1);
    });
  });
});