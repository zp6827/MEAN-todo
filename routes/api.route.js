let express = require('express');
let todos = require('./api/todos.route');


var router = express.Router();
router.use('/todos', todos);

module.exports = router;