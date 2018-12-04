var { SHA256 } = require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
  id: 1
}

var token = jwt.sign(data,'123abc')
var decoded = jwt.verify(token,"123abc");


console.log(token)
console.log(`decode ${JSON.stringify(decoded).toString()}`)

// var message = 'hi i am awesome';
// var hashed = SHA256(message).toString();
// 
// console.log(`message is ${message}`);
// console.log(`hashed message is ${hashed}`);
