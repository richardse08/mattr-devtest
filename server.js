var express = require('express');
var app = express();
var emailDump;
var port = process.env.PORT || 3000;

// Configure Mongo database
var MongoClient = require('mongodb').MongoClient; // Require mongodb
var doesCollectionExist = true; // Set checker tool so only one document is made
// var url = "mongodb://localhost:27017/mydb"; // Set a URL for my database
var url = 'mongodb://mattr-username:mattr-password1@ds137246.mlab.com:37246/mattr-database';

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

// API to receive AJAX hits from client ,this inserts the data object into emailDump
app.get("/email-save", function(request, response) {    
    
    // Create request parameters (this may only need to be one?)
    var emailParam = request.param('emailAddress');
    var testParam = request.param('emailTimestamp');
    // Plug params into an object
    var dataObj = {
        emailAddress: emailParam,
        emailTimestamp: testParam
    }
        
    // Send the params object to MongClient.connect if collection doesn't exist
    // This should only run ONE time, this way we don't have to manually load a collection if the db is changed
    // NOTE: This will also run (ie, doesCollectionExist will be true again) if the server is restarted...
    if (doesCollectionExist == true) {
        emailDump.insertOne(dataObj);
        doesCollectionExist = false;
        console.log('collection does exist');
    }
    // Otherwise, just update that existing object
    else if (doesCollectionExist == false) {
        console.log('collection does NOT exist');
        emailDump.update(
            // Query selector grabs the ID
            // { 
            //     emailAddress: emailParam,
            //     emailTimestamp: testParam
            // },
            // // Define what to update
            // {
            //     emailAddress: emailParam,
            //     emailTimestamp: testParam
            // },

            // No need to write out the full object, just update the whole thing
            dataObj,
            dataObj,
            
            // Tell mongo to re-check each time
            { upsert: true }
        );
    }

    response.send("success");

}); // End API


app.listen(port); //Open browser to “localhost:<port>” to view pages