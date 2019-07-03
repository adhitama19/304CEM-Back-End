var mongoose = require("mongoose");


// Create the DB type
var newsSchema = new mongoose.Schema({
    newsTitle: String,
    newsImage: String,
    newsInfo: String,
    
    userCreate: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        
        username: String
    },
    
    newsComm: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comm"
        }
    ]
});

module.exports = mongoose.model("News", newsSchema);



