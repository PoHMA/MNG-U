var express = require('express');
var github = require('octonode');
var router = express.Router();
var router = express();

var client = github.client();

var ghuser;
var number_page = 1;
var limit_sup;
var amount_card_page = 20;

router.get('/user',function(req,res) {
    var parametros = [];
    var number_repos;
    if(req.url.indexOf("?")){
        ghuser = client.user(getNameUser(req));;
    }
    ghuser.info(function (err,body,status) {
        number_repos = body.public_repos;
        limit_sup = calculateNumberPages(number_repos);
    });
    ghuser.repos(1, amount_card_page, function (err,body,status) {
        res.render('list-repositories.jade',{projects:body, User:ghuser, page:number_page});
    });
});

router.get('/next',function(req,res) {
    var parametros = [];
    if (number_page < limit_sup) 
        number_page = number_page + 1;
    if(req.url.indexOf("?")){
        ghuser = client.user(getNameUser(req));;
    }
    ghuser.repos(number_page, amount_card_page, function (err,body,status) {
        res.render('list-repositories.jade',{projects:body, User:ghuser, page:number_page});
    });
});

router.get('/prev',function(req,res) {
    var parametros = [];
    if (number_page > 1) 
        number_page = number_page - 1;
    if(req.url.indexOf("?")){
        ghuser = client.user(getNameUser(req));;
    }
    ghuser.repos(number_page, amount_card_page, function (err,body,status) {
        res.render('list-repositories.jade',{projects:body, User:ghuser, page:number_page});
    });
});

function getNameUser(req) {
    var url_data = req.url.split("?");
    var parametros = url_data[1].split("&");
    var valores = parametros[0].split("=");
    return valores[1];
}

function calculateNumberPages(amount_pages) {
    var answer = Math.floor(amount_pages/amount_card_page);
    if(amount_pages%amount_card_page != 0)
        answer = answer + 1;
    return answer;
}

module.exports = router;