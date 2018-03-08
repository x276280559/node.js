//引入
var mongoose = require("../db");

//创建本地数据库模板
var shopSchema = new mongoose.Schema({
    page:"string",    
    pageSize:"string",
    sort:"string",
    priceLevel:"string",
    productId:"string"                           
  });
//连接  
var i =mongoose.model(
    'good',
    shopSchema
)
//曝光
module.exports = i;