var express = require('express');
var app = express();

app.use(express.static('public'));
app.set("view engine","jade");

app.use(require('./routes/index.js'));
app.use(require('./routes/repository.js'));

app.listen(8080, function () {
    console.log("starting");
});
