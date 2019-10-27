var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

// require all models
var db = require("./models");

var PORT =  process.env.PORT || 3000;

// initialize Express
var app = express();

// configure middleware

// use morgan logger for logging requests
app.use(logger("dev"));

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use(express.static("public"));

// Set handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// GET route for scraping Hombrewers Association site
app.get("/", function (req, res) {
    axios.get("https://www.homebrewersassociation.org/category/news/").then(function (response) {

        var $ = cheerio.load(response.data);
        var articles = [];

        $("article h2").each(function (i, element) {
            var result = {};

            // add the text, image, and href of every link and save them to result object
            result.title = $(this).children("a").text();
            result.link = $(this).children("a").attr("href");
            result.img = $(this).parent("article").children("figure").children("a").children("img").attr("src");

            // create a new article using the result object
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                }).catch(function (err) {
                    console.log(err);
                });

            articles.push(result);
            
        });
        res.render("index", {articles: articles});
    });
});

app.get("/clear", function (req, res) { 
    db.Article.remove({})
        .then(function (data) {
            console.log("clearing articles");
        })
        .catch(function (err) {
            console.log(err);
        });
    res.render("index");
});



app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});