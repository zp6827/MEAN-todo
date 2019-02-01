let TodoService = require('../services/todo.service')

_this = this;

exports.getTodos = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10;

  try {
    var todos = await TodoService.getTodos({}, page, limit);

    return res.status(200).json({status: 200, data: todos, message: "Successfully received todos"})
  } catch (error) {

    return res.status(400).json({status: 400, message: error.message})
  }
}


exports.createTodo = async function(req, res, next) {
  var todo = {
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  }

  try {
    var createdTodo = await TodoService.createTodo(todo);

    return res.status(201).json({status: 201, data: createdTodo, message: "Successfully created todo"})
  } catch (error) {
    return res.status(400).json({status: 400, message: "Error while trying to create Todo"})
  }
};


exports.updateTodo = async function (req, res, next) {
  if (!req.body._id) {
    return res.status(400).json({status: 400, message: "Must include id when trying to update todo"})
  }

  var id = req.body._id;

  // console.log("BODY: " + req.body);

  var todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null,
  };

  try {
    var updatedTodo = await TodoService.updateToDo(todo);

    return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Todo"})
  }catch (error) {
    return res.status(400).json({status: 400., message: error.message})
  }
};


exports.removeTodo = async function(req, res, next) {

  var id = req.params.id;

  try {
    var deleted = await TodoService.deleteTodo(id);

    return res.status(200).json({status:200, message: "Successfully Deleted Todo"})
  } catch (error) {

    return res.status(400).json({status: 400, message: error.message})
  }
};