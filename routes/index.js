var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");
var flash = require("connect-flash");

//show landing page
router.get("/", function(req, res){
    res.render("landing");
});

//show signup form
router.get("/signup", function (req, res) { 
    res.render("signup");
 });

 // User Authentication====================================
 //handle signup logic
 router.post("/signup", function (req, res) {
     var newUser = new user({username: req.body.username}); 
     user.register(newUser, req.body.password, function(err, data) { 
         if(err)
         {
             console.log(err.message);
            //  var errr = "Please eneter both username and password!!!";
             //req.flash("error", err.message);
             return req.flash("error", err.message), res.render("signup");
         }
         passport.authenticate("local")(req, res, function () { 
            req.flash("success", "Welcome to YelpCamp '"+ req.body.username +"' ...");
             res.redirect("/home");
             
          });
      });
  });

  //show login form
  router.get("/login", function (req, res) { 
    res.render("login");
 });

  //handle login logic
 router.post("/login", passport.authenticate("local",{
    successRedirect: "/home",
    successFlash: 'Welcome!',
    failureRedirect: "/login",
    failureFlash: "Invalid username or password."
}), function (req, res) {  });

 //logout route
router.get("/logout", function (req, res) { 
    req.logOut();
    req.flash("success", "Logged you out");
    res.redirect("/home");
 });

 module.exports = router;