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

    //findOneAndUpdate
    // db.collection("Todos").findOneAndUpdate({
    //   _id: new ObjectID("5bffef2227110193c99d8766")
    // }, {
    //   $set: {
    //     completed: true
    //   }
    // }, {
    //   returnOriginal: false
    // }).then((result) => {
    //   console.log(result)
    // })

    // db.collection("Users").findOneAndUpdate({
    //   name: "Mani"
    // },{
    //   $set: {
    //     name: "Bholu"
    //   }
    // },{
    //   returnOriginal: false
    // }).then((result) => {
    //   console.log(result)
    // })

    db.collection("Users").findOneAndUpdate({
      name: "Ashutosh"
    },{
      $set: {
        name: "Ashutosh Tripathi"
      },
      $inc: {
        age: 5
      }
    },{
      returnOriginal: false
    }).then((result) => {
      console.log(result)
    })


    // db.close();
  }
);
