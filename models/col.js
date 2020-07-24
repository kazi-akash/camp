var mongo = require("mongoose");

var sc = new mongo.Schema({   // creating data schema for database
    name: String,
    price: String,
    image: String,
    desc: String,
    author: 
    {
        id:
        { 
            type: mongo.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    },
    comments: [
        {
            type: mongo.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
});

module.exports = mongo.model("data_v12", sc); // adding dataSchema(data collection/table name) to data model also exporting the data to app.js