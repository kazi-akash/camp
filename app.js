var express = require("express");
var app = express();
var bp = require("body-parser");
var mongo = require("mongoose");
var passport = require("passport");
var session= require("express-session");
var localStrategy = require("passport-local");
var methodOverride = require("method-override");
var flash = require("connect-flash");

var user = require("./models/user");


//requireing routes
var commentRoutes = require("./routes/comments"); 
var campRoutes = require("./routes/camp"); 
var indexRoutes = require("./routes/index");

//seeds();

app.set("view engine", "ejs");
app.use(bp.urlencoded({extended: true}));
app.use(express.static(__dirname+ "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//connecting to mongo database
mongo.connect("mongodb+srv://root:root@yelpcamp.rrdd8.mongodb.net/yelpcamp?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

//connecting to mongo database
// mongo.connect("mongodb://localhost:27017/yelpcamp", {
//     useUnifiedTopology: true,
//     useNewUrlParser: true
// });

//Authentication passport-config===========================

app.use(require("express-session")({
    secret: "oh its a secret request",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

//signed in as/ we can check it from each ejs file
app.use(function (req, res, next) { 
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
 });

//calling routers
app.use("/", indexRoutes);
app.use("/home", campRoutes);
app.use("/home/:id/comments", commentRoutes);

app.get("/*", function (req, res) {
  req.flash("error", "Sorry to say! There is not no such direction/path in this webpage...");
  res.redirect("/");
 });



app.listen(3000, function(){ 
    console.log("Yelpcamp server started successfully!");
});