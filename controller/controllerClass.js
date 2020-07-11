const express = require('express');
var router = express.Router();
var ClassSubject = require('../models/classmodel');
router.post('/', (req, res) => {
    console.log("add class");
    if (req.body._id == '' || req.body._id === undefined) {
        let classSubject = new ClassSubject();
        classSubject.classSubjectName = req.body.classSubjectName;
        classSubject.save((err, doc) => {
            if (!err)
                console.log("add classSubject done")
            else {
                console.log('Error during record insertion :' + err);
            }
        });
    }
    else {// req có id sẽ hiểu là đang update
        // console.log("updating");
        ClassSubject.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) {
                res.json({ status: 200 });
            }
            else {
                console.log('Error during record update:' + err);
            }
        });
    }
})
router.get('/list', (req, res) => {//lấy toàn bộ employee
    ClassSubject.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving ClassSubject list :' + err);
        };
    });
});
// router.get('/list:subjects', (req, res) => {//lấy toàn bộ employee
//     Lession.find({ "lessionContentSubjects": "Toán lớp 2" }, (err, docs) => {//tìm toàn bộ 
//         if (!err) {
//             res.json(docs);
//         }
//         else {
//             console.log('Error in retrieving lession list :' + err);
//         };
//     });
// });

router.get('/delete/:id', (req, res) => {

    ClassSubject.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ status: 200 });
        }
        else { console.log('Error in goodstudent delete:' + err); }
    });
});
router.get('/:id', (req, res) => {

    ClassSubject.findById(req.params.id, (err, doc) => {
        if (!err) {
            // res.render('lession/updatelession', {
            //     lession: doc
            // });
            res.json(doc);
        }
        else { console.log('Error in GoodStudent update:' + err); }
    });

});


module.exports = router;