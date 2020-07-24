const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Lession = require('../models/lessonContentModel');
var multer = require("multer");
var upload = multer({ dest: './public/uploads' })
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
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

router.post('/',upload.single('lessionContentImg'), (req, res) => {
    console.log("Voooooo");
    if (req.body._id == '' || req.body._id === undefined) {
        let lession = new Lession();
        lession.lessionContentSubjects = req.body.lessionContentSubjects;
        lession.lessionContentTitle = req.body.lessionContentTitle;
        lession.lessionContentDetail = req.body.lessionContentDetail;
        if (req.file) {
            lession.lessionContentImg = req.file.path.split('/').slice(1).join('/');
        }
        else {
            lession.lessionContentImg = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
        }
        lession.save((err, doc) => {
            if (!err)
                console.log("add new done")
            else {
                console.log('Error during record insertion :' + err);
            }
        });
    }
    else {// req có id sẽ hiểu là đang update
        Lession.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) {
                res.redirect('lession/list');
            }
            else {
                console.log('Error during record update:' + err);
            }
        });
    }
})
router.get('/list', (req, res) => {//lấy toàn bộ employee
    Lession.find((err, docs) => {//tìm toàn bộ 
        // console.log(`Co chay hay khong ${docs}`)

        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrievinng lession list :' + err);
        };
    });
});
router.get('/list/:subjects', (req, res) => {
   console.log(req.params.subjects)
    Lession.find({ "lessionContentSubjects": req.params.subjects }, (err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving lession list :' + err);
        };
    });
});

router.get('/delete/:id', (req, res) => {

    Lession.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/lession/list');
        }
        else { console.log('Error in lession delete:' + err); }
    });
});
router.get('/:id', (req, res) => {
    Lession.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else { console.log('Error in lession update:' + err); }
    });

});

module.exports = router;