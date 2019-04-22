var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");

const CONNECTION_URI = process.env.MONGOD_URI || "mongodb://localhost/scraperDB";
mongoose.connect(CONNECTION_URI);

var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models")
var PORT = process.env.PORT || 3000;

var app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/scrape", function(req, res){

    axios.get("https://www.gamespot.com/news/").then(function(response){

        var $ = cheerio.load(response.data);

        $("article").each(function(i, element){

            let result = {}

            result.img = $(this).find("img").attr("src");
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

app.post("/allArticles/:id", function(req, res){
    db.Comment.create(req.body).then(function(dbComment){
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { comment: dbComment._id }, { new: true });
    }).then(function(dbArticle){
        res.json(dbArticle)
    })
    .catch(function(err){
        res.send(err);
    })
})

app.get("/allComments", function(req, res){
    db.Comment.find({}).then(function(dbArticle){
        res.send(dbArticle);
    }).catch(function(err){
        res.send(err);
    })
})



app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  