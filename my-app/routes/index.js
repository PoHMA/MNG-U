var express = require('express');
var github = require('octonode');
var router = express.Router();
var router = express();

var client = github.client();


router.get('/',function(req,res) {
  client.get('/users', 1, 21, true, function (err, status, body, headers) {    
    res.render('index.jade', {users: body});
    });
});


module.exports = router;