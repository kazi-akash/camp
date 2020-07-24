var mongo = require("mongoose");
var col = require("./models/col"); 
var comment = require("./models/comments"); 

var data = [
    {name: "National Park", image: "https://cdn.pixabay.com/photo/2016/11/21/16/03/campfire-1846142_960_720.jpg", desc: "The United States has 62 protected areas known as national parks[1] that are operated by the National Park Service, an agency of the Department of the Interior."},
    {name: "Canadian National Park", image: "https://cdn.pixabay.com/photo/2019/10/03/11/14/camp-4522970_960_720.jpg", desc: "Canadian National Parks are among the most affordable travel bargains on the market. The unspoiled splendor you'll find in places such as Banff National Park will add value to any budget trip. Admission charges are modest in comparison to the value offered."},
    {name: "Fish and Wildlife", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg", desc: "The Mission of the Department of Fish and Wildlife is to manage California's diverse fish, wildlife, and plant resources, and the habitats upon which they depend, for their ecological values and for their use and enjoyment by the public."}
];

function seeds(){
    col.remove({}, function (err, value) { 
        if(err)
        {
            console.log(err);
        }
        else{
    //         data.forEach(function(val) { 
    //             col.create(val, function (err, coldt) { 
    //                 if(err)
    //                 {
    //                     console.log(err);
    //                 }
    //                 else{
    //                     comment.create({
    //                         text: "This is a great place",
    //                         author: "Sara"
    //                     }, function (err, cmntdata) {
    //                         if(err)
    //                         {
    //                             console.log(err);
    //                         }
    //                         else
    //                         {
    //                             coldt.comments.push(cmntdata);
    //                             coldt.save();
    //                             console.log("new comments created");
    //                         }
    //                       });
    //                 };
    //              });
    //          });
        }
     });
}

module.exports = seeds;
