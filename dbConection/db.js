
const mongoose = require('mongoose');
const stringConection ="mongodb+srv://nlkids:nlkids@cluster0-gvkap.mongodb.net/<dbname>?retryWrites=true&w=majority"||
"mongodb://localhost:27017/NLkids"
mongoose.connect(stringConection, 
{ useNewUrlParser: true,useUnifiedTopology: true,useFindAndModify: false }, (err) => {
    if (!err) { console.log('MongoDB Connection Succeeded.'); }
    else { console.log('Error in DB connection : ' + err) }
});
