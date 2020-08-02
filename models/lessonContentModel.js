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
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('lessoncontent',lessionContentSchema);