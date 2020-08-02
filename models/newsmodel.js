var mongoose = require('mongoose');
var newsSchema = mongoose.Schema({
    categoryNews:{
        type:String
    },
    contents:{
        type:String
    },
    title:{
        type:String
    },
    images:{
        type:String
    },
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('News',newsSchema);