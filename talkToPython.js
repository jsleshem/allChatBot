// const express = require('express');
// var app = express();
// var http = require('http').Server(app);
// var bodyParser = require('body-parser');
//
// app.use(bodyParser.json())
// app.post('/',function(req,res){
//       var msg=req.body.msg;
//       console.log("python: " + msg);
// });
//
// http.listen(3000, function(){
//   console.log('listening...');
// });
//
// app.post('/d', function(req, res) {
//     var dog = "AHA";
//     console.log(dog);
//     dogsArr.push(dog);
//     res.send("Dog added!");
// });

var http = require('http');

var options = {
  host: '123.0.0.1',
  path: '/',
  port: '3000',
  method: 'POST'
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var req = http.request(options, callback);
//This is the data we are posting, it needs to be a string or a buffer
req.write("data");
req.end();
