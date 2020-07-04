const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var News = require('../models/newsmodel');
var multer = require("multer");
var upload = multer({dest:'./public/uploads'})
    const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads");
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null,Date.now()+ '-' + fileName)
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
router.get('/', (req, res) => {
    res.render("new/addOrEdit");

});
router.post('/',upload.single('selectedFile'), (req, res,next) => {
    if (req.body._id == ''|| req.body._id === undefined) {
        console.log(req.file);
        let news = new News();
        news.title = req.body.title;
        news.images = req.file.path.split('/').slice(1).join('/');
        news.contents = req.body.contents;
        news.timeUpdate = req.body.timeUpdate;
        // console.log(req.file.path.split('/').slice(1).join('/'));
        news.save((err, doc) => {
            if (!err){}
             //   res.redirect('news/list');
            else {
                console.log('Error during record insertion :' + err);
            }
        });
    }
    else {// req có id sẽ hiểu là đang update
        News.findOneAndUpdate({ _id: req.body._id },req.body,{new:true},(err,doc)=>{
            if (!err) 
            {
                //  res.redirect('news/list');
            }
            else {
            console.log('Error during record update:' + err);
                    }
         } );
        }
})
router.get('/list', (req, res) => {//lấy toàn bộ employee
    News.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
            // res.render("new/list", {
            //     list: docs//gán vào list và tiến hành render ra
            // });
            //  
        }
        else {
            console.log('Error in retrieving news list :' + err);
        };
    });
});

router.get('/delete/:id', (req, res) => {

    News.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else { console.log('Error in news delete:' + err); }
    });
});
router.get('/:id', (req, res) => {

    News.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else { console.log('Error in news update:' + err); }
    });

});
module.exports = router;