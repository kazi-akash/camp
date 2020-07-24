var mongo = require("mongoose");
var passportLocalMongo = require("passport-local-mongoose");

var userSchema = new mongo.Schema({
    username: String,
    password: String
});

userSchema.plugin(passportLocalMongo);

module.exports = mongo.model("user", userSchema);