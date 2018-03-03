var fs = require("fs");
var express = require('express');
var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });
app.use(express.static("html"))
app.get('/list', function (req, res) {
    //var a =[1,2,3]
    fs.readdir("./images","utf8",function(err,a){
       res.json(a);
    })
  });
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});