var express = require('express');
var github = require('octonode');
var router = express.Router();
var router = express();

var client = github.client();

var ghuser;

router.get('/user',function(req,res) {
    var parametros = [];
    if(req.url.indexOf("?")){
        ghuser = client.user(getNameUser(req));;
    }
    ghuser.repos(1, 10, function (err,body,status) {
        console.log(body);
        res.render('list-repositories.jade',{projects:body});
    });
});

function getNameUser(req) {
    var url_data = req.url.split("?");
    var parametros = url_data[1].split("&");
    var valores = parametros[0].split("=");
    return valores[1];
}


module.exports = router;