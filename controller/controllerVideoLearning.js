const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var VideoLearning = require('../models/videomodel');
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

router.post('/', (req, res) => {
    console.log(req.body.videoContentSubjects);
    if (req.body._id == '' || req.body._id === undefined) {
        let videoLearning = new VideoLearning();
        videoLearning.videoContentSubjects = req.body.videoContentSubjects;
        videoLearning.videoContentTitle = req.body.videoContentTitle;
        videoLearning.videoContentDetail = req.body.videoContentDetail;
        videoLearning.videoContentVideo = req.body.videoContentDetail;
        videoLearning.save((err, doc) => {
            if (!err)
                console.log("add video done")
            else {
                console.log('Error during record insertion :' + err);
            }
        });
    }
    else {// req có id sẽ hiểu là đang update
        VideoLearning.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) {
                res.redirect('/list');
            }
            else {
                console.log('Error during record update:' + err);
            }
        });
    }
})
router.get('/list', (req, res) => {//lấy toàn bộ employee
    VideoLearning.find((err, docs) => {//tìm toàn bộ 
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

    VideoLearning.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ status: 200 });
        }
        else { console.log('Error in goodstudent delete:' + err); }
    });
});
router.get('/:id', (req, res) => {

    VideoLearning.findById(req.params.id, (err, doc) => {
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