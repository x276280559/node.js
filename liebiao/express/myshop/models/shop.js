//引入
var mongoose = require("../db");

//创建本地数据库模板
var userSchema = new mongoose.Schema({
  
    userId:"string",
    userName:"string",
    userpwd:"string",
    orderList:"Array",
    cartList:"Array",
    addressList:"Array",
    cartDel:"string"
});
//连接 
var u = mongoose.model(
    'user',
    userSchema
);
//曝光
module.exports = u;
