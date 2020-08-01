var mongoose = require('mongoose');
var classSubjectSchema = mongoose.Schema({
    classSubjectName:{
        type:String
    },
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('classSubject',classSubjectSchema);