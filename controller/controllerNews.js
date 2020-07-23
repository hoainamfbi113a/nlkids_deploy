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
    console.log("ID: " + req.body._id)
    if (req.body._id === ''|| req.body._id === undefined) {
        let news = new News();
        news.title = req.body.title;
        news.categoryNews = req.body.categoryNews;
        // console.log(req.file);
        if(req.file){
        news.images = req.file.path.split('/').slice(1).join('/');
        // news.images = req.file.path.split('\\').slice(1).join('/');
        
        }
        else{
            news.images = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
        }
        news.contents = req.body.contents;
        news.timeUpdate = req.body.timeUpdate;
        // console.log(req.file.path.split('/').slice(1).join('/'));
        news.save((err, doc) => {
                // res.redirect('news/list');
                console.log("add new done")
        })
    }
    else {// req có id sẽ hiểu là đang update
        // news.title = req.body.title;
        if(req.file){
            req.body.images = req.file.path.split('/').slice(1).join('/');
            // req.body.images = req.file.path.split('\\').slice(1).join('/');
        }
            else {
                await  News.findById(req.body._id, (err, doc) => {
                      if (!err) {//không có lỗi thì điền vào form dữ liệu update
                      }
                      console.log(doc.avatarContentImg);
                      req.body.images = doc.images
                  });
              }
        News.findOneAndUpdate({ _id: req.body._id },req.body,{new:true},(err,doc)=>{
            if (!err) 
            {
                res.json({ status: 200 });
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
        }
        else {
            console.log('Error in retrieving news list :' + err);
        };
    });
});


router.get('/delete/:id', (req, res) => {
    console.log("a"+ req.params.id)
    News.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ status: 200 });
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