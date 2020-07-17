var mongoose = require('mongoose');
var gameContentSchema = mongoose.Schema({
    categoryvocabulary:{
        type:String
    },
    vocabularygame:{
        type:String
    },
    spellingvocabulary:{
        type:String
    },
    questionResultA:{
        ImgQuestionA:String,
        meaningA:String,
    },
    questionResultB:{
        ImgQuestionB:String,
        meaningB:String,
    },
    questionResultC:{
        ImgQuestionC:String,
        meaningC:String,
    },
    questionResultRight:{
        type:String
    },
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('gamecontent',gameContentSchema);