//Require npm modules
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    Converter = require("csvtojson").core.Converter,
    fs = require("fs");

//init the app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static( path.resolve('src')));

var convertCSV2JSON = function (csv, json) {

var Converter=require("csvtojson").core.Converter;

var csvConverter=new Converter({constructResult:false, toArrayString:true}); // The constructResult parameter=false will turn off final result construction in memory for stream feature. toArrayString will stream out a normal JSON array object.

var readStream=require("fs").createReadStream(csv);

var writeStream=require("fs").createWriteStream(json);

readStream.pipe(csvConverter).pipe(writeStream);

};
//initial conversion upon server start
convertCSV2JSON("test.csv", "src/json/outputData.json")
convertCSV2JSON("test2.csv", "src/json/outputData2.json")

//convert the csv with the newest data every day (24hrs)
setInterval(function() {
	console.log('24hrs have passed, fetching latest CSV');
	convertCSV2JSON("test.csv", "src/json/outputData.json")
	convertCSV2JSON("test2.csv", "src/json/outputData2.json")
}, 86400000);


//ROUTE TO ROOT
app.use(express.static( path.resolve('src')));

//===============PORT=================
var port = process.env.PORT || 1337; //select your port or let it pull from your .env file

app.listen(port);

console.log("listening on " + port + "!");