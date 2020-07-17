var mongoose = require('mongoose');
var goodStudentSchema = mongoose.Schema({
    title:{
        type:String
    },
    
    contents:{
        type:String
    },
    
    images:{
        type:String
    },
})
module.exports= mongoose.model('goodStudent',goodStudentSchema);