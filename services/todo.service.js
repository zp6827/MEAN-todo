let ToDo = require('../models/todo.model');

_this = this;


// get the to do list
exports.getTodos = async function(query, page, limit) {
  var options = {
    page,
    limit
  }

  try {
    var todos = await ToDo.paginate(query, options);
    return todos;
  } catch (error) {
    throw Error("Error while paginating todos")
  }
}


// create a new to do item
exports.createTodo = async function(todo) {
  // create a new `to do` item
  var newTodo = new ToDo({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status
  })

  // save the newly created to do item
  try {
    var savedTodo = await newTodo.save()

    return savedTodo
  } catch (error) {
    throw Error("Error while saving newly created todo item")
  }
}


exports.updateToDo = async function(todo) {
  var id = todo.id

  try {
    var oldTodo = await ToDo.findById(id)
  } catch (error) {
    throw Error("Error occured while trying to find todo with id: ")
  }

  if (!oldTodo) return false

  console.log("Updating todo: " + oldTodo)

  oldTodo.title = todo.title
  oldTodo.description = todo.description
  oldTodo.status = todo.status

  try {
    var savedTodo = await oldTodo.save()
    return savedTodo;
  }catch(error) {
    throw Error("An Error occured while saving the updated Todo");
  }
}


// delete the to do item
exports.deleteTodo = async function(id) {
  try {
    var deleted = await ToDo.remove({_id: id})
    if (deleted.result.n === 0) {
      throw Error("Todo could not be deleted")
    }

    return deleted
  } catch (error) {
    throw Error("Error occured while deleting todo")
  }
}

