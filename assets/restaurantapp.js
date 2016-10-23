// Class 13.3 = Building a restaurant app
// Restaurant App
// There are three separate pages - Basic Home Page, Views Tables and Make Reservation
// Creat API section, which will list the two API 
// 
// // Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use('/assets', express.static(__dirname + '/assets/css'));


// Starts the server to begin listening
// =============================================================
// console.log("here");

app.listen(PORT, function(err) {
    if (err) {
        console.log(err);
    }
    console.log('App listening on PORT ' + PORT);
});


// This would hold the first five customers and put them in the 'Current Reservations' section
var customers = [{
    customerName: 'Customer 1',
    phoneNumber: 5555555555,
    customerEmail: 'test@gmail.com',
    customerID: 2
}, {
    customerName: 'Customer 2',
    phoneNumber: 1234567891,
    customerEmail: 'test2@gamil.com',
    customerID: 3
}]

// This would hold those customers after the fifth
var waitlist= []

// Routes
// =============================================================

// TODO NEED TO UPDATE THIS with updated file name
// 
// Basic route that sends the user first to the AJAX home page
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
    // res.send("Hello World!");
});

// This will be the show tables page
app.get('/tables', function(req, res) {
    res.sendFile(path.join(__dirname, '../tables.html'));
});

// This will be the reservation page to handle user input
app.get('/reserve', function(req, res) {
    res.sendFile(path.join(__dirname, '../reserve.html'));
});

// JSON data for the customers that currently either have a table 
app.get('/api/tables', function(req, res) {
    res.json(customers);

});

// JSON data for the
app.get('/api/waitlist', function(req, res) {
    res.json(waitlist);

});


// Create New Customers - takes in JSON input
app.post('/reserve', function(req, res) {
    var newcustomer = req.body;
    // newcustomer.routeName = newcustomer.name.replace(/\s+/g, '').toLowerCase();

    console.log(newcustomer);
    if (customers.length < 5) {
        customers.push(newcustomer);
        // res.send("We have a table for you");
    } else {
    	waitlist.push(newcustomer);
    	// res.send("Sorry you are on the wait list");
    }
    // res.json(newcustomer);
    res.status(201).send();
});

//
