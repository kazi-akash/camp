var col = require("../models/col");
var comments = require("../models/comments");

var middleware = {};

// checking if logged in
middleware.isLoggedin = function (req, res, next) { 
    if(req.isAuthenticated())
    {
        return next();
    }
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
 };

middleware.checkPostOwnership = function  (req, res, next) 
{ 
     //checking logged in or not
    if(req.isAuthenticated)
   {
    col.findById(req.params.id, function (err, data) { 
    if(err)
    {
        req.flash("error", "OH NoOo | Post not found!");
        res.redirect("back");
    }
    else
    {
        if(data.author.id.equals(req.user._id))
        {
            next();
        }
        else
        {
            req.flash("error", "Hei! you don't have permission to do that!!!");
            res.redirect("back");
        }  
    }
     });
   }
   else
   {
    res.redirect("back");
   }
};

middleware.checkCommentOwnership = function  (req, res, next) 
{ 
   //checking logged in or not
    if(req.isAuthenticated)
   {
    comments.findById(req.params.comment_id, function (err, data) { 
    if(err)
    {
        req.flash("error", "OH NoOo | Comment not found!");
        console.log(err);
        res.redirect("back");
    }
    else
    {
        if(data.author.id.equals(req.user._id))
        {
            next();
        }
        else
        {
            req.flash("error", "Hei! you don't have permission to do that!!!");
            res.redirect("back");
        }  
    }
     });
   }
   else
   {
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("back");
   }
};


module.exports = middleware;