var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
    img:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "Note"
      }
})

var Article = mongoose.model("Article", ArticleSchema);
module.exports = Article;