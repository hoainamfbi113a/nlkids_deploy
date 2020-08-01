var mongoose = require('mongoose');
var examContentSchema = mongoose.Schema({
    questionCategoryId:{
        type:String
    },
    questionName:{
        type:String
    },
    questionResultA:{
        type:String
    },
    questionResultB:{
        type:String
    },
    
    questionResultC:{
        type:String
    },
    questionResultD:{
        type:String
    },
    questionResultRight:{
        type:String
    },
    examId:{
        type:String
    },
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('Examcontent',examContentSchema);