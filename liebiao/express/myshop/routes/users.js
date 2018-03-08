var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

var user = require(
  "../models/shop"
);
//登录获取端口
var checkLogins =""
router.post('/login', function(req, res) {
  var username =req.body.userName;
  var userPwd =req.body.userPwd;
  var obj = {
    userName:username,
    userPwd:userPwd
  }
  console.log(obj)
  user.findOne(obj,function(err,data){
    console.log(data)
    if(data==null){
      res.json({msg:"登录失败或密码错误"})
      return
    }else{
      res.json({msg:"登录成功"})
      //如果成功就保存cookie值
      // var cookieParser = require('cookie-parser')
      // var app = express()
      // app.use(cookieParser())
    //  var checkLogins = req.cookies.name

    res.cookie("username", "zhangsan", {
      maxAge: 1000 * 60 * 60
    })
    res.cookie("userId", data.userId, {
      maxAge: 1000 * 60 * 60
    })
     
    }
  })
  
});

//检查是否登录端口
router.get('/checkLogin', function(req, res) {
  // 先取出 name
  var checkLogins = req.cookies("username")
  if(checkLogins==null){
    //  res.json("未登录") 
    res.json({
      status: 1,
      msg: "显示登录"
    })
  }else{
    // res.json("显示登录")     //返回的状态不会写，不知道怎么表示给前端  ？
    res.json({
      status: 0,
      msg: "显示登录"
    })
  }
})
//退出端口
router.post('/logout', function(req, res) {
  if(checkLogins==null){
   res.json("未登录")   //z这个不用告诉前端
  }else{
    res.cookie("username", "", {
      maxAge: 0
    })
    res.json("显示登录")      
    //思路：如果是显示状态，继续下一步退出操作。。。
  }
})
//获取购物车数量端口
router.get('/getCartCount', function(req, res) {
    user.find({},function(err,data){

      data.cartList.length
      // res.json(data)
    })
})
//查看购物车端口
router.get('/cartList', function(req, res) {
  user.find({},function(err,data){

    // res.json(data)

    res.json({
      status: 0,
      data: data.cartList
    })
    
    // res.json(data)
  })
})
//购物车删除端口
router.post('/cartDel', function(req, res) {    //无法测试数据
  var cartDel = req.body.cartDel;

  // 根据用户ID 先取出 用户 
  var userId = req.cookies("userId")
  user.findOne({userId: userId}, function(err, data) {
    //数据库中的结构属性。data下面的数组的ID值。
    for(var i =0;i<data.cartList;i++){
      if(data.cartList[i].productId == cartDel){ //判断是否数据库的ID与购物车的ID一样
        data.cartList.splice(i,1);//删除数组中下标为i的项
      }
    }
    data.save()//更新
  })

  //user.remove({cartDels:cartDel},function(err,data){
   // res.json(data)
  //  console.log(data)
  //})
})
module.exports = router;
