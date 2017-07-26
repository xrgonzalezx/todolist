const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const todos = [];
const comptodos =[];

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

app.get("/", function (request, response) {
  response.render('todo', { todos: todos, comptodos: comptodos });
});

app.post("/", function (request, response) {
  todos.push(request.body.todo);
  response.redirect('/');
})

app.listen(3000, function(){
  console.log('Server Started');
})
