var express = require(“express”);
var app = express();

var port = process.env.PORT || 3000;

// This will serve the public docs
app.use('/', express.static(__dirname + '/public'));

// Render homepage
app.get('/', function(request,response) {
    response.render('index');
});

app.listen(port); //Open browser to “localhost:<port>” to view pages