var mongoose = require('mongoose');
var memberSchema = mongoose.Schema({
    memberCategory:{
        type:String
    },
    memberLogin:{
        type:String
    },
    memberPass:{
        type:String
    },
    memberName:{
        type:String
    },
    
    memberDate:{
        type:String
    },
    memberSex:{
        type:String
    },
    memberAddress:{
        type:String
    },
    avatarContentImg:{
        type:String
    },
    created: { type: Date, default: Date.now }
})
module.exports= mongoose.model('Member',memberSchema);