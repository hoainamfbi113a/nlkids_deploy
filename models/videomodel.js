var mongoose = require('mongoose');
var videoContentSchema = mongoose.Schema({
    videoContentSubjects:{
        type:String
    },
    videoContentTitle:{
        type:String
    },
    videoContentVideo:{
        type:String
    },
    videoContentDetail:{
        type:String
    },
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('videolearning',videoContentSchema);