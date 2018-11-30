var { ObjectID } = require('mongodb');

var { mongoose } = require('../server/db/mongoose');
var { Todo } = require('../server/models/todo');
var { User } = require('../server/models/user');

var id = "5c0166e6ef9ad9088f8c2737";

if(!ObjectID.isValid(id)){
  console.log('id not valid')
}
//
// Todo.deleteMany({}).then((result) => {
//   console.log(result)
// })

Todo.findByIdAndDelete(id).then((result) => {
  console.log(result)
})
