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
})
module.exports= mongoose.model('videolearning',videoContentSchema);