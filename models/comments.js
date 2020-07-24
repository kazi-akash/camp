var mongo = require("mongoose");

var commentSchema = new mongo.Schema({
    text: String,
    author:
    {
        id:
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
    //author: String
});

module.exports = mongo.model("comment", commentSchema);