var express = require('express');
var github = require('octonode');
var router = express.Router();
var router = express();
var client = github.client();
var paginacion = 0;

router.get('/',function(req,res) {
  client.get('/users', function (err, status, body, headers) {    
    res.render('index.jade', {users: body});
    });
});

module.exports = router;