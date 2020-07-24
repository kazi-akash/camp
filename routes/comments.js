var express = require("express");
var router = express.Router({mergeParams: true}); //working for "home/:id/comments"
var col = require("../models/col");
var comments = require("../models/comments");
var user = require("../models/user");
var methodOverride = require("method-override");
var middleware = require("../middleware/index"); //check user logged in or not

router.use(methodOverride("_method"));


//show adding new comment page and checking authentications
router.get("/new", middleware.isLoggedin, function(req, res){
    col.findById(req.params.id, function (err, data) { 
       if(err)
       {
           console.log(err);
       }
       else
       {
           res.render("comments/new", {data: data});
       }
     });
});

//check authentications and create new comments
router.post("/", middleware.isLoggedin, function (req,res) { 
   col.findById(req.params.id, function (err, data) { 
       if(err)
       {
           console.log(err);
           res.redirect("/home");
       }
       else
       {
           comments.create(req.body.comment, function (err, val) { 
               if(err)
               {
                   req.flash("error", "Somthing went Wrong!");
                   console.log(err);
                   res.redirect("/home");
               }
               else
               {
                   //add username and is to comment
                   val.author.id = req.user._id;
                   val.author.username = req.user.username;
                //console.log(req.user.username);
                   
                   //save comment
                   val.save();
                   data.comments.push(val);
                   data.save();
                   req.flash("success", "Successfully added a comment...");
                   res.redirect("/home/"+data._id);
               }
            });
       }
    });
});

//editing comment
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) { 

    var commentId = req.params.comment_id;
    var postId = req.params.id;
    console.log("Post Id: "+ postId);
    console.log("Comment Id: "+ commentId);
    comments.findById(commentId, function (err, foundData) { 
        if(err)
        {
            res.redirect("back");
        }
        else
        {
            res.render("comments/edit", {postId: postId, comment: foundData});
        }
     })
 });

 router.put("/:comment_id/update", middleware.checkCommentOwnership, function(req, res) { 
     //updating post
     comments.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedData) { 
         if(err)
         {
             res.redirect("back");
         }
         else
         {
            req.flash("success", "Successfully updated your commrnt...");
            res.redirect("/home/" + req.params.id);
         }
      });
  });

  //delete comment
  router.delete("/:comment_id/delete", middleware.checkCommentOwnership, function (req, res) { 
      comments.findByIdAndRemove(req.params.comment_id, function (err, value) { 
          if(err)
          {
              res.redirect("back");
          }
          else
          {
              req.flash("success", "Successfully deleted your comment...");
              res.redirect("/home/"+ req.params.id);
          }
       });
   });



//function that cheaking user us logged in or not



module.exports = router;
