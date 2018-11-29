const MongoClient = require('mongodb').MongoClient;
// const {MongoClient, ObjectId} = require('mongodb');

// const obj = new ObjectId();
// console.log(obj)


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',{useNewUrlParser: true},
  (err, client) => {
    if (err) {
    return console.log('Unable to connect to database');
    }
    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    // db.collection("Todos").insertOne(
    //    {
    //      text: "Call Everyone",
    //      completed: false
    //    },
    //    (err, result) => {
    //      if (err) {
    //        return console.log("Unable to insert todo", err);
    //      }
    //      console.log("Todo inserted successfully");
    //      console.log(result.ops)
    //    }
    //  );
    // db.collection('Users').insertOne(
    //   {
    //     name: 'Ashutosh',
    //     age: 18,
    //     location: 'Banglore',
    //   },
    //   (err, result) => {
    //     if (err) {
    //       return console.log('Unable to insert data', err);
    //     }
    //
    //     console.log(result.ops[0]._id.getTimeStamp());
    //   }
    // );

    client.close();
  }
);
