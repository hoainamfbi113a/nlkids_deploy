var mongoose = require('mongoose');
var lessionContentSchema = mongoose.Schema({
    lessionContentSubjects:{
        type:String
    },
    lessionContentTitle:{
        type:String
    },
    lessionContentImg:{
        type:String
    },
    lessionContentDetail:{
        type:String
    },
})
module.exports= mongoose.model('lessoncontent',lessionContentSchema);