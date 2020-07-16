var mongoose = require('mongoose');
var forumQuestionSchema = mongoose.Schema({
    nameForumQuestion:{
        type:String
    },
    classForumQuestion:{
        type:String
    },
    titleForumQuestion:{
        type:String
    },
    memberForumQuestion:{
        avatarContentImg:String,
        memberName:String
    },
    memberForumReply:[{
        avatarContentImg:String,
        memberName:String,
        answer:String
    }],
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('forumquestion',forumQuestionSchema);