const assert = require('assert');
const TodoController = require('../src/controllers/todoController');
const TodoModel = require('../src/models/todoModel');

describe('TodoController', function() {
  describe('#create()', function() {
    it('should create a new TODO item', function() {
      const controller = new TodoController();
      const model = new TodoModel('Test TODO item');
      controller.create(model);
      assert.strictEqual(controller.todos.length, 1);
    });
  });

  describe('#read()', function() {
    it('should read a TODO item', function() {
      const controller = new TodoController();
      const model = new TodoModel('Test TODO item');
      controller.create(model);
      const readModel = controller.read(0);
      assert.strictEqual(readModel, model);
    });
  });

  describe('#update()', function() {
    it('should update a TODO item', function() {
      const controller = new TodoController();
      const model = new TodoModel('Test TODO item');
      controller.create(model);
      const updatedModel = new TodoModel('Updated TODO item');
      controller.update(0, updatedModel);
      assert.strictEqual(controller.todos[0], updatedModel);
    });
  });

  describe('#delete()', function() {
    it('should delete a TODO item', function() {
      const controller = new TodoController();
      const model = new TodoModel('Test TODO item');
      controller.create(model);
      controller.delete(0);
      assert.strictEqual(controller.todos.length, 0);
    });
  });
});