var mongoose = require("mongoose");
var Merch = require("./models/items");
var Comm = require("./models/comm");


var data = [
    
    {
        itemTitle: "AM 1",
        itemImage: "https://cdn.thesolesupplier.co.uk/2017/09/Nike-Air-Max-1-OG-2017-Red-03.png",
        itemDesc: "What is Lorem Ipsum?Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Why do we use it?It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."

    },
    
    {
        itemTitle: "AM BULL",
        itemImage: "https://i0.wp.com/www.nicekicks.com/files/2017/01/Nike-Air-Max-97-Silver-Bullet-.jpg?fit=1500%2C800",
        itemDesc: "Very Nice!"
    },
    
    {
        itemTitle: "Golf le fleur",
        itemImage: "https://images.solecollector.com/complex/images/c_fill,f_auto,fl_lossy,q_auto,w_800/nwezwu7l33bky7uj7mka/tyler-converse-golf-le-fleur-jolly-green",
        itemDesc: "Very Bad!"
    }
    
    
    
    ];



function dataDB (){
    
    //Remove all the DB
    Merch.remove({}, function(err){
    // if(err){
    //     console.log(err);
    // } 
    // console.log("Data deleted");
        
    //     //Add view items to sell (dummy)
    //     data.forEach(function(shoes){
            
    //         Merch.create(shoes, function(err, items){
    //             if(err){
    //                 console.log(err);
    //             } else {
    //                 console.log("Added an Item");
                    
    //                 //Create comment
    //                 Comm.create(
    //                 {
    //                     text: "One of the awesome shoes ever",
    //                     author: "John"
    //                 }, function(err, comment){
    //                     if(err){
    //                         console.log("Failed to add a comment");
    //                     } else {

    //                         items.itemComm.push(comment);
    //                         items.save();
    //                         console.log("Comments created");
    //                     }
    //                 });
    //             }
                
    //         });
            
    //     });
        
    });
};





// Call the function
module.exports = dataDB;



