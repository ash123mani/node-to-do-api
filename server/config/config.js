var env = process.env.NODE_ENV || "developement";

console.log("***env is***", env)

if(env === "developement"){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/TodoApp";
} else if(env === "test"){
  proces.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/TodoAppTest";
}
