// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// const obj = new ObjectId();
// console.log(obj)


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',{useNewUrlParser: true},
 (err, client) => {
    if (err) {
    return console.log('Unable to connect to database');
    }
    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    //deleteMany
    // db.collection('Todos').deleteMany({text: "Call everyone"}).then((result) => {
    //   console.log(result)
    // })

    //deleteOne
    // db.collection('Todos').deleteOne({text: "Call Everyone"}).then((result) => {
    //   console.log(result)
    // })

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //   console.log(result)
    // })

    // db.collection('Users').deleteMany({name: "Ashutosh"}).then((result) => {
    //   console.log(result)
    // })

    db.collection('Users').findOneAndDelete({
      _id : new ObjectID('5bffe4ef27110193c99d8559')
    }).then((result) => {
      console.log(result)
    })


    // db.close();
  }
);
