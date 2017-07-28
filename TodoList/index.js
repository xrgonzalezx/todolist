const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
let listOfTodos = [];


var app = express();

//configure mustache with express
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

//Allows public folder to be served statically to browsers
app.use(express.static('public'));

//configure Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function (request, response) {
  response.render('todos', { todos: listOfTodos });
});

app.post('/', function (request, response) {
let id = parseInt(Math.random() * 1000);
newTodoObject = { text: request.body.newTodo, id: id }
listOfTodos.push(newTodoObject);
  response.redirect('/');
});

app.post('/mark-complete/:id', function (request, response) {
  let markComplete = parseInt(request.params.id);
  let completedTodo = listOfTodos.find(function (todo) {
    return todo.id === markComplete
  });
  completedTodo.complete = true;
  response.redirect('/');
})

app.listen(3000, function () {
  console.log('Jarvis on, how can i help');
});
