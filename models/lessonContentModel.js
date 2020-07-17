var mongoose = require('mongoose');
var lessionContentSchema = mongoose.Schema({
    lessionContentSubjects:{
        type:String
    },
    lessionContentTitle:{
        type:String
    },
    lessionContentImg:{
        type:String
    },
    lessionContentDetail:{
        type:String
    },
    lessonType:{
        type:Number,
    },
    classType:{
        class:{
            name:{
                type:String
            },
            classId:{
                type:Number
            }
        }
    }
})
module.exports= mongoose.model('lessoncontent',lessionContentSchema);