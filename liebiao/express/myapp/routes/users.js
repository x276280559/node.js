var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var user = require("../models/user");  //引入
//查询
router.get('/list', function(req, res) {
//查询信息
 user.find({},function(err,data){
   //查询其中的一条信息
   user.findOne({},function(err,data){
     res.json(data)
   })
 })
});
//增加一个数据端口
router.get('/add',function(req,res){
  var obj = {
    name: req.query.name,
    set: req.query.set,
  }
  user.create(obj,function(err,data){
      res.json(data)
  })
  
})
//  var arr =[
//    req.query.name,//错误写法
//    req.query.job
// ] ;
// var m =""
// for(var i=0;i<arr.length;i++){
//   m = arr[i]
// }
// user.create({m},function(err,data){
//     res.json(data)
// })

  // {
  //   username: "zhangsan"
  // }



//删除
router.post("/del",function(req,res){
  req.body.username

  var obj = {username: req.query.username}
  user.findOne(obj, function(err, a) {
    a.remove(function() {
      console.log("删除成功")
    })
  })

  user.remove({},function(err,data){
    res.json(data)
  })
})
module.exports = router;
