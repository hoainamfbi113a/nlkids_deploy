var mongoose = require('mongoose');
var gameSchema = mongoose.Schema({
    vocabularygame:{
        type:String
    },
    spellingvocabulary:{
        type:String
    },
    membergame:{
        avatarContentImg:String,
        memberName:String
    },
    questionResult:[{
        ImgQuestion:String,
        questionResultA:String,
        meaning:String,
    }],
    questionResultRight:{
        type:String
    },
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('game',gameSchema);