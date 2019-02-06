//Basic required imports for NodeJS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//Used for easy parsing of user-agent for response
var useragent = require('express-useragent');

//Create instance of express for app, instantiate bodyParser and cors
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors({optionSuccessStatus: 200}));
app.use(useragent.express());

//API URL
var api = '/api/whoami'; // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get(api, (req, res, next) => {
    let language = req.acceptsLanguages();
    let software = "OS: " + req.useragent.os + ", Browser: " + req.useragent.browser;
    // or you can use req.headers['user-agent']; --same way of getting data for software
    let ipaddress = req.ip;
    
    res.json({'ipaddress': ipaddress, 'language': language[0], 'software': software});
});

var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});