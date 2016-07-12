var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];

var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
	res.send('TODO API Root');
});

// GET /todos
app.get('/todos', function(req, res){
	//JSON
	res.json(todos);
});

app.get('/todos/:id', function(req,res){
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo; //Undefined

	todos.forEach(function(todo){
		if (todoId===todo.id){
			matchedTodo = todo;
		}
	});

	// Undefined is falsey
	if (matchedTodo) {
		res.json(matchedTodo);
	}
	else {
		res.status(404).send();
	}
	//Iterate array, find the match
	//res.send('Asking for id of ' + req.params.id)
	
});

// POST http-method /todos
app.post('/todos', function(req, res){
	var body=req.body;

	// add id-field
	body.id = todoNextId;
	todoNextId++;

	// push body into array
	todos.push(body);

	res.json(body);

});

app.listen(PORT, function(){
	console.log('Express listening on port ' + PORT + '!' );
});