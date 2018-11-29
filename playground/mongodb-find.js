// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectId} = require('mongodb');

// const obj = new ObjectId();
// console.log(obj)


MongoClient.connect('mongodb://127.0.0.1:27017/TodoApp',{useNewUrlParser: true},
 (err, client) => {
    if (err) {
    return console.log('Unable to connect to database');
    }
    console.log('Connected to mongodb server');

    const db = client.db('TodoApp');

    // db.collection("Todos").find(
    //   {_id: new ObjectId('5bfec52b6631eb5607c3a924')
    // }).toArray().then((docs) => {
    //   console.log('Todos');
    //   console.log(JSON.stringify(docs, undefined, 4));
    // },(err) => {
    //   console.log("Unable to fetch data", err);
    // })

    // db.collection("Todos").find({}).count().then((count) => {
    //   console.log(`Number of todos ${count}`)
    // },(err) => {
    //   console.log("Unable to fetch data", err);
    // })

    // db.collection("Todos").find({}).count().then((count) => {
    //   console.log(`Number of todos ${count}`)
    // },(err) => {
    //   console.log("Unable to fetch data", err);
    // })

    db.collection("Users").find({name: "Ashutosh"}).toArray().then((docs) => {
      console.log(`Number of todos ${JSON.stringify(docs, undefined, 4)}`)
    },(err) => {
      console.log("Unable to fetch data", err);
    })

    // client.close();
  }
);
