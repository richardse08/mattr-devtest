var express = require('express');
var app = express();
var port = process.env.PORT || 5000;

// This will serve the public docs
app.use('/', express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); // Set view engine and give extension
app.set('views', './views'); // Rename views a folder called views



// Render ejs for homepage
app.get('/', function(request, response) {

    // Use render to run through ejs and then send up the index.ejs (which is my homepage)
    response.render('index');

});




app.listen(port); //Open browser to “localhost:<port>” to view pages