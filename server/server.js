var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require("./db/mongoose");
var { Todo } = require("./models/todo");
var { User } = require("./models/user");

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body.text);

  var newTodo =  new Todo({
    text: req.body.text
  });

  newTodo.save().then((doc) => {
    console.log(doc)
    res.send(doc)
  }, (err) => {
    res.status(400).send(err)
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((doc) => {
    res.send(doc)
  })
}, (err) => {
  res.send(err.status(400).send())
})


app.listen(3000, () => {
  console.log("listening on port", 3000);
});
