var mongoose = require('mongoose');
var employeeSchema = mongoose.Schema({
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    }
})

module.exports= mongoose.model('Employee',employeeSchema);