var mongoose = require('mongoose');
var classSubjectSchema = mongoose.Schema({
    classSubjectName:{
        type:String
    },
})
module.exports= mongoose.model('classSubject',classSubjectSchema);