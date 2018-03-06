var mongoose = require("../db");//引入
var userSchema = new mongoose.Schema({
    name:"string",
    age:"string",
    sex:"string",
    nation:"string",
    Id:"string",
    photo:"string",
    job:"string"
});
var u = mongoose.model(
    'user',
    userSchema
);
module.exports = u;