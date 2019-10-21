var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// require all models
var db = require("./models");

var PORT = 3000;

// initialize Express
var app = express();

// configure middleware

// use morgan logger for logging requests
app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
