let express = require('express');
let ToDoController = require('../../controllers/todos.controller');

var router = express.Router();

// create the routes
router.get('/', ToDoController.getTodos);
router.post('/', ToDoController.createTodo);
router.put('/', ToDoController.updateTodo);
router.delete('/:id',ToDoController.removeTodo);

module.exports = router;