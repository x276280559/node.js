var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//引入模块路径
var good = require(
    "../models/good"
  );
//首页商品列表接口端口
router.get('/list', function(req, res) {
    var page = req.query.page;          //分页功能
    var pageSize = req.query.pageSize;  //每页的数量
    var sort = req.query.sort;          //是否排序   1为正序  2二为倒序
    var priceLevel = req.query.priceLevel;
    //查询数据库与传输过来的比对
    good.find({},function(err,data){
    // console.log(data)    //正常，能获得数据
    // data 是1个数组  遍历
    //  page: 1, pagesize: 8     ==> 0, 7
    //  page: 2, pagesize: 8     ==> 8, 15
    //  page: 3, pagesize: 8     ==> 16, 23
    //  page: n, pagesize: m     ==> (n-1)*m, n*m-1
        var start = (page-1)*pageSize;  //开始值
        var end = page*pageSize-1;      //结束值
       //刷选出对应的分页数据
        var arr = [];
        for(var i = start;i<end;i++){
            arr.push(data[i])
        };
        if (sort == 1) {  //排序
            arr.sort(function(a, b) {  //数组自带的方法，当函数中A大于B，设置为正序，反之为倒序。
              return a.salePrice > b.salePrice
            })
        } else {
            arr.sort(function(a, b) {
              return a.salePrice < b.salePrice
            })
        };
        res.json({
            msg:"获取成功",
            data:arr
        })
    })
})  

//添加到购物车端口 productId  201710006
router.post('/addCart', function(req, res){
    var productIds = req.body.productId;
    good.create({productId:productIds},function(err,doc){
       // console.log(doc)   打印出来会有个—id的值              ？？
        res.json(doc)
    })
})
module.exports = router;