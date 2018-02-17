var express = require('express');
var app = express();
var emailDump;
var port = process.env.PORT || 3000;





// Configure Mongo database
var MongoClient = require('mongodb').MongoClient; // Require mongodb
var doesCollectionExist = true; // Set checker tool so only one document is made
var url = "mongodb://localhost:27017/mydb"; // Set a URL for my database



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





















// // This will get the data that was sent to mongo and turn it into 
// // a document that we can manipulate
// app.get("/poll/:id", function(request, response) {
    
//     // Get name of poll
//     var poll_id = request.params.id;
    
//     // Search mongo using the poll_id
//     var mongoData = pollCollection.find().toArray(function(err, documents) { 

        
//         if (documents.length !== 0) {
//             var selectionDocument1 = documents[0].count;
//             var selectionDocument2 = documents[1].count;
//             var selectionDocument3 = documents[2].count;
//             var selectionDocument4 = documents[3].count;
//         }
        
//         var header = "Operating System";
//         var selectionName1 = "Mac OS";
//         var selectionName2 = "Windows";
//         var selectionName3 = "Linux";
//         var selectionName4 = "Ubuntu";
        
        
//         pageObject = {
            
//             // Title of poll
//             pollType: {
//                 header: header
//             },
            
//             // Name of options for poll
//             pollOption: {
//                 selectionName1: selectionName1,
//                 selectionName2: selectionName2,
//                 selectionName3: selectionName3,
//                 selectionName4: selectionName4
//             },
            
//             // Tally of counts for poll
//             pollTally: {
//                 selectionCount1: selectionDocument1,
//                 selectionCount2: selectionDocument2,
//                 selectionCount3: selectionDocument3,
//                 selectionCount4: selectionDocument4   
//             }
//         }
        
        
//         response.render("pollFile", pageObject);
        
        
//     }); // End mongoData
    
// //    response.render("pollFile", pageObject);
    
    
// }); // End app.get for /poll/id:



























// API to receive AJAX hits from client
// This inserts the data object (page, selection, count) into pollCollection
app.get("/email-save", function(request, response) {    
    
    // Create request parameters (this may only need to be one?)
    var pageParam = request.param('testEmail');
    
    // Plug params into an object
    var dataObj = {
        testEmail: pageParam
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
                testEmail: pageParam
            },
            
            // Define what to update
            {
                testEmail: pageParam
            },
            
            // Tell mongo to re-check each time
            { upsert: true }
        );
        
    }
    
    
    response.send("success");
}); // End API


















app.listen(port); //Open browser to “localhost:<port>” to view pages