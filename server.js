var express = require('express');
var app = express();
var emailDump;
var port = process.env.PORT || 3000;





// Configure Mongo database
var MongoClient = require('mongodb').MongoClient; // Require mongodb
var doesCollectionExist = true; // Set checker tool so only one document is made
// var url = "mongodb://localhost:27017/mydb"; // Set a URL for my database
// var url = 'mongodb://heroku_ntrr7rs8:tnlbaftr91a687mraljvejr491@ds239988.mlab.com:39988/heroku_ntrr7rs8';
var url = 'mongodb://richardse1988:developmentpassword1@ds137246.mlab.com:37246/mattr-database';



// Connect to database
MongoClient.connect(url, function(err, db) {
    
    if (err) throw err;
    
    // Redefine pollCollection as a collection
    emailDump = db.collection("emailDump");
    
});




















// This will serve the public docs
app.use('/', express.static(__dirname + '/public'));
app.set('view engine', 'ejs'); // Set view engine and give extension
app.set('views', './views'); // Rename views a folder called views



// Render ejs for homepage
app.get('/', function(request, response) {

    // Use render to run through ejs and then send up the index.ejs (which is my homepage)
    response.render('index');

});




























// API to receive AJAX hits from client
// This inserts the data object (page, selection, count) into pollCollection
app.get("/email-save", function(request, response) {    
    
    // Create request parameters (this may only need to be one?)
    var emailParam = request.param('emailAddress');
    
    // Plug params into an object
    var dataObj = {
        emailAddress: emailParam
    }
        
    // Send the params object to MongClient.connect if collection doesn't exist
    if(doesCollectionExist == true) {
        emailDump.insertOne(dataObj);
        doesCollectionExist = false;
    }
    
    // Otherwise, just update that existing opject
    else if (doesCollectionExist == false) {
        
        emailDump.update(
            
            // Query selector grabs the ID
            { 
                emailAddress: emailParam
            },
            
            // Define what to update
            {
                emailAddress: emailParam
            },
            
            // Tell mongo to re-check each time
            { upsert: true }
        );
        
    }
    
    
    response.send("success");
}); // End API


















app.listen(port); //Open browser to “localhost:<port>” to view pages