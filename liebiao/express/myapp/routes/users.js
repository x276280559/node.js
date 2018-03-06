var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
var user = require("../models/user");  //引入
router.get('/list', function(req, res) {
 user.find({},function(err,data){
  res.json(data)
 })
});

module.exports = router;
