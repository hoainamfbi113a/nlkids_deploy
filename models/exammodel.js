var mongoose = require('mongoose');
var examSchema = mongoose.Schema({
    examEasyNumber:{
        type:String
    },
    examName:{
        type:String
    },
    examTimeMake:{
        type:String
    },
    classId:{
        type:String
    },
    examCategoryNumber:{
        type:String
    },
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('Exam',examSchema);