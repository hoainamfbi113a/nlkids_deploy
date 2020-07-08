const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var GoodStudent = require('../models/goodstudentmodel');
var multer = require("multer");
var upload = multer({ dest: './public/uploads/goodstudent' })
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/goodstudent");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, Date.now() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

router.post('/',upload.single('images'), (req, res) => {
    console.log("Voooooo");
    if (req.body._id == '' || req.body._id === undefined) {
        let goodstudent = new GoodStudent();
        goodstudent.title = req.body.title;
        goodstudent.contents = req.body.contents;
        // goodstudent.images = req.body.lessionContentDetail;
        if (req.file) {
            goodstudent.images = req.file.path.split('/').slice(1).join('/');
        }
        else {
            goodstudent.images = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
        }
        goodstudent.save((err, doc) => {
            if (!err)
                console.log("add new done")
            else {
                console.log('Error during record insertion :' + err);
            }
        });
    }
    else {// req có id sẽ hiểu là đang update
        GoodStudent.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) {
                res.redirect('goodstudent/list');
            }
            else {
                console.log('Error during record update:' + err);
            }
        });
    }
})
router.get('/list', (req, res) => {//lấy toàn bộ employee
    GoodStudent.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving goodstudent list :' + err);
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

    GoodStudent.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/goodstudent/list');
        }
        else { console.log('Error in goodstudent delete:' + err); }
    });
});
router.get('/:id', (req, res) => {

    GoodStudent.findById(req.params.id, (err, doc) => {
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