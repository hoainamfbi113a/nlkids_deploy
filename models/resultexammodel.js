var mongoose = require('mongoose');
var resultSchema = mongoose.Schema({
    socaudung:{
        type:String
    },
    socausai:{
        type:String
    },
    examinationid:{
        type:String
    },
    memberid:{
        type:String
    },
})
module.exports= mongoose.model('Result',resultSchema);