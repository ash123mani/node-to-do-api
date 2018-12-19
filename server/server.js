require('./config/config');

var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');
var _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var {authenticate} = require('./middleware/authenticate');

var app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body.text);

  var newTodo = new Todo({
    text: req.body.text,
  });

  newTodo.save().then(
    doc => {
      console.log(doc);
      res.send(doc);
    },
    err => {
      res.status(400).send(err);
    }
  );
});

app.get(
  '/todos',
  (req, res) => {
    Todo.find().then(todo => {
      res.send({
        todo,
      });
    });
  },
  err => {
    res.send(err.status(400).send());
  }
);

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  Todo.findById(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.send({
        todo,
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.delete('todo/:id', (req, res) => {
  var id = req.params.id;

  if (!Object.isValid(id)) {
    res.status(404).send();
  }

  Todo.findByIdAndDelete(id)
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.send(todo);
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getDate();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate(
    id,
    {
      $set: body,
    },
    {
      new: true,
    }
  )
    .then(todo => {
      if (!todo) {
        res.status(404).send();
      }
      res.send({
        todo,
      });
    })
    .catch(e => {
      res.status(400).send();
    });
});

app.get('/user/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  var newUser = new User({
    email: body.email,
    password: body.password,
  });

  newUser
    .save()
    .then(() => {
      return newUser.generateAuthToken();
    })
    .then(token => {
      res.header('x-auth', token).send(newUser);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(port, () => {
  console.log(`Started at port ${port}`);
});
