
//引入获取文件的模板
var fs = require("fs"); 
//引入模板
var express = require('express');
var app = express();    //调用
//设置请求方式
app.use(express.static("html"));
app.use(express.static("photo"));
//app.use(express.static("html"))
app.get('/photolist',function(req,res){

    var user =req.query.a;
    fs.readdir("./photo/" + user,function(err,files){
      res.json(files)
    })
 })
app.get('/list',function(req,res){
    fs.readdir("./photo","utf8",function(err, a){
      //  console.log(files)
      res.json(a)
    })
  //  res.send('haha')
});

//表单格式化
var formidable = require("formidable");
var path = require("path");
//定义个post接口
app.post('/upload',function(req,res){
    //格式化一个表单
    var form = new formidable.IncomingForm();

    // 设置文件的上传路径 
    //    __dirname  当前文件所在路径
    //创建一个新的文件夹接收  tempup
    form.uploadDir = path.normalize(__dirname + "/tempup/");
    
    form.parse(req, function(err, fields, files, next) {
        // 输出图片路径, 上传到服务器的路径
        var filePath = files.tp.path;
        
                // 将图片移动到对应的图片文件夹中
                // 将图片移动到01图片文件夹中
        
                var newpath = path.normalize("./images/01/1.png");
        
                // rename 文件改名
                fs.rename(filePath, newpath, function(err) {
                    if (err) {
                        res.json({result: "失败"})
                        return ;
                    }
                    res.json({result: "成功"})
                })

    })
})

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
// })
