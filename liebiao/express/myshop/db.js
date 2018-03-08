//引入mongoose模块
var mongoose = require("mongoose");
//连本地数据库
mongoose.connect("mongodb://localhost:27017/shop");
//曝光
module.exports= mongoose;