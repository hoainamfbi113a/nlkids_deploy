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
    timeUpdate:{
        type:String
    },
})
module.exports= mongoose.model('News',newsSchema);