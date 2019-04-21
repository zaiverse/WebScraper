var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models")
var PORT = 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/scraperDB", { useNewUrlParser: true });

app.get("/scrape", function(req, res){

    axios.get("https://www.gamespot.com/news/").then(function(response){

        var $ = cheerio.load(response.data);

        $("article").each(function(i, element){

            var result = {};

            result.img = $(this).find("img").attr("href");
            result.title = $(this).find("h3").text();
            result.description = $(this).find("p").text();
            result.link = $(this).find("a").attr("href");  

            db.Article.create(result).then(function(dbArticle){
                console.log(dbArticle);
            }).catch(function(err){
                console.log(err)
            })
        })
        res.send("You done did it")
    })
})

app.get("/allArticles", function(req, res){
    db.Article.find({}).then(function(dbArticle){
        res.send(dbArticle);
    }).catch(function(err){
        res.send(err);
    })
})


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  