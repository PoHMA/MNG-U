var express = require('express');
var github = require('octonode');
var router = express.Router();
var router = express();

var client = github.client();

var ghuser;

router.get('/user',function(req,res) {
    var parametros = [];
    var name_user;
    if(req.url.indexOf("?")){
        var url_data = req.url.split("?");
        var parametros = url_data[1].split("&");
        var valores = parametros[0].split("=");
        name_user = valores[1];
        ghuser = client.user(name_user);;
    }
    ghuser.repos(2, 10, function (err,body,status) {
        res.render('list-repositories.jade',{projects:body});
    });
});


module.exports = router;