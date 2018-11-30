var { ObjectID } = require('mongodb');

var { mongoose } = require('../server/db/mongoose');
var { Todo } = require('../server/models/todo');
var { User } = require('../server/models/user');

var id = "5c014650ef9ad9088f8c1a34";

if(!ObjectID.isValid(id)){
  console.log('id not valid')
}

// Todo.find({
//   _id: id
// }).then((doc) => {
//   console.log(doc)
// },(err) => {
//   console.log("Unable to fetch data");
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log(todo)
// }, (err) => {
//   console.log(err)
// })

// Todo.findById(id).then((todo) => {
//   if(!todo) {
//     console.log('Id not found')
//   }
//   console.log("Fetched data", todo)
// }).catch((e) => {
//   console.log(e)
// })

User.findById(id).then((user) => {
  if(!user){
    return console.log("Id not found");
  }
  console.log("User is", user);
}).catch((e) => {
  console.log(e)
})
