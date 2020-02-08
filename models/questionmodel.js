var mongoose = require('mongoose');
var questionSchema = mongoose.Schema({
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
})
module.exports= mongoose.model('Question',questionSchema);