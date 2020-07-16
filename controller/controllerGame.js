const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Games = require('../models/gamemodel');
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
        let games = new Games();
        games.title = req.body.title;
        games.categorygames = req.body.categorygames;
        if(req.file){
        games.images = req.file.path.split('/').slice(1).join('/');
        }
        else{
            games.images = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
        }
        games.contents = req.body.contents;
        games.timeUpdate = req.body.timeUpdate;
        // console.log(req.file.path.split('/').slice(1).join('/'));
        games.save((err, doc) => {
            if (!err)
                // res.redirect('games/list');
                console.log("add new done")
            else {
                console.log('Error during record insertion :' + err);
            }
        });
    }
    else {// req có id sẽ hiểu là đang update
        // games.title = req.body.title;
        if(req.file){
            req.body.images = req.file.path.split('/').slice(1).join('/');
        }
        else{
            req.body.images = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
        }
        Games.findOneAndUpdate({ _id: req.body._id },req.body,{new:true},(err,doc)=>{
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
    Games.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving Games list :' + err);
        };
    });
});

router.get('/delete/:id', (req, res) => {
    console.log("a"+ req.params.id)
    Games.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({ status: 200 });
        }
        else { console.log('Error in Games delete:' + err); }
    });
});
router.get('/:id', (req, res) => {
    Games.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.json(doc);
        }
        else { console.log('Error in Games update:' + err); }
    });

});

module.exports = router;