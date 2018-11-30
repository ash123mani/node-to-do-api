var express = require('express');
var bodyParser = require('body-parser');
var { ObjectID } = require('mongodb');

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
  Todo.find().then((todo) => {
    res.send({todo})
  })
}, (err) => {
  res.send(err.status(400).send())
})

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if(!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if(!todo) {
      res.status(404).send();
    }

    res.send({ todo })
  }).catch((e) => {
    res.status(400).send()
  })
})


app.listen(3000, () => {
  console.log("listening on port", 3000);
});
