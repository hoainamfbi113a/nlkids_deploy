var mongoose = require('mongoose');
var examSchema = mongoose.Schema({
   
    examEasyNumber:{
        type:String
    },
    examMediumNumber:{
        type:String
    },
    
    examDifficultNumber:{
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
})
module.exports= mongoose.model('Exam',examSchema);