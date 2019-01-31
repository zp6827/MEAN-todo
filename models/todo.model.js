let mongoose = require('mongoose');
let mongoosePaginate = require('mongooes-paginate');


var ToDoSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  status: String
});

ToDoSchema.plugin(mongoosePaginate);
const ToDo = mongoose.model('Todo', ToDoSchema);

module.exports = ToDo;