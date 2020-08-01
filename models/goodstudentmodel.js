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
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('goodStudent',goodStudentSchema);