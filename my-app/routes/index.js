var express = require('express');
var router = express.Router();
var router = express();


router.get('/',function(req,res) {
  res.render('index.jade');
});


module.exports = router;