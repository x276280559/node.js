//引入获取文件的模板
var fs = require("fs");
//引入模板
var express = require('express');
var app = express();    //调用
//设置请求方式
app.use(express.static("html"));
//app.use(express.static("html"))
app.get('/',function(req,res){
    fs.readdir("./photo","utf8",function(err, a){
      //  console.log(files)
      res.json(a)
    })
  //  res.send('haha')
});
var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
})
// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// var server = app.listen(3000, function () {
//   var host = server.address().address;
//   var port = server.address().port;

//   //console.log('Example app listening at http://%s:%s', host, port);
// });
