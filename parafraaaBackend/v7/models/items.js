var mongoose = require("mongoose");


// Create the DB type
var itemSchema = new mongoose.Schema({
    itemTitle: String,
    itemImage: String,
    itemDesc: String,
    
    userCreate: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        
        username: String
    },
    
    itemComm: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comm"
        }
    ]
});


module.exports = mongoose.model("Merch", itemSchema);