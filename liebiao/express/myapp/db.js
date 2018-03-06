//引入mongoose模块
var mongoose = require("mongoose");
//连本地数据库
mongoose.connect("mongodb://localhost:27017/sum");
//将mongoose暴露出去
module.exports = mongoose;