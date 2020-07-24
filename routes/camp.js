var express = require("express");
var router = express.Router();
var col = require("../models/col");
var seeds = require("../seeds");
const { route } = require("./comments");
var middleware = require("../middleware/index"); //check user logged in or not
//seeds();

 //show home page with data
router.get("/", function(req,res){
    col.find({}, function(err, data){
        if(err)
        {
            console.log("error: "+ err);
        }
        else
        {
            res.render("camp/index", {data: data}); //sending data to home
        }
    });
   // res.render("camp", {data: data});
});

//creating new post
router.get("/new", middleware.isLoggedin, function (req,res) { 
    res.render("camp/new");
 });

 //taking data from post form
 router.post("/dataEntry", middleware.isLoggedin, function (req,res) { 
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc  = req.body.desc;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var values = {name: name, price: price, image: image, desc:desc, author: author};

    //storing data[post] to database
    col.create(values, function(err, newCreatedData){
        if(err)
        {
            console.log("error: "+ err);
        }
        else
        {
            newCreatedData.save();
            req.flash("success", "Successfully added your post...");
            res.redirect("/home");
            console.log("data added to database! \n"+ newCreatedData);
        }
    });
    //data.push(values);
    // res.redirect("/home");
    // console.log("data added!");
 });

 //take to the clicked post and restore post & comment
 router.get("/:id", function(req, res){
    //finding data by id
    col.findById(req.params.id).populate("comments").exec(function(err, foundDataById) { 
       if(err)
       {
           console.log("Data not found!"+ err);
       }
       else
       {
           res.render("camp/show", {data: foundDataById});
       }
     });
   //res.render("show");
});

//edit camp route
router.get("/:id/edit", middleware.checkPostOwnership, function (req, res) 
{ 
    col.findById(req.params.id, function (err, data) 
    { 
     res.render("camp/edit", {data: data});
    });
 });

//edit/update camp route/post
router.put("/:id/update", middleware.checkPostOwnership, function (req, res) { 
    col.findByIdAndUpdate(req.params.id, req.body.editCamp, function (err, values) { 
        if(err)
        {
            res.redirect("/home");
        }
        else
        { 
            req.flash("success", "Successfully updated your post...");
          res.redirect("/home/" + req.params.id);      
        }
     });  
   
 });

 //delete post
 router.delete("/:id/delete", middleware.checkPostOwnership, function (req, res) { 
     col.findByIdAndRemove(req.params.id, function (err, data) { 
         if(err)
         {
             console.log(err);
         }
         else{
            req.flash("success", "Your post deleted...");
             res.redirect("/home");
         }
      });
  });

// checking if logged in



module.exports = router;

