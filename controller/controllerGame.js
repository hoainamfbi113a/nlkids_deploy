const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Games = require('../models/gamemodel');
var GameContentSchema = require('../models/gamecontentmodel');
var multer = require("multer");
var upload = multer({
    dest: './public/uploads/game'
})
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/game");
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
router.get('/', (req, res) => {
    res.render("new/addOrEdit");

});
router.post('/', upload.fields([{
        name: 'imgQuestionA',
        maxCount: 1,
    }, {
        name: 'imgQuestionB'
    },
    {
        name: 'imgQuestionC'
    }
]), (req, res, next) => {
    if (req.body._id === '' || req.body._id === undefined) {
        let games = new Games();
        games.categoryvocabulary = req.body.categoryvocabulary;
        games.vocabularygame = req.body.vocabularygame;
        games.spellingvocabulary = req.body.spellingvocabulary;
        games.questionResultA.meaningA = req.body.meaningA;
        console.log(req.body.meaningA+"meningA")
        games.questionResultB.meaningB = req.body.meaningB;
        games.questionResultC.meaningC = req.body.meaningC;
        games.questionResultRight = req.body.questionResultRight;

        if (req.files['imgQuestionA']) {
            games.questionResultA.ImgQuestionA = req.files['imgQuestionA'][0].path.split('/').slice(1).join('/');
        } else {
            games.questionResultA.ImgQuestionA = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
        }
        if (req.files['imgQuestionB']) {
            games.questionResultB.ImgQuestionB = req.files['imgQuestionB'][0].path.split('/').slice(1).join('/');
        } else {
            games.questionResultB.ImgQuestionB = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
        }
        if (req.files['imgQuestionC']) {
            games.questionResultC.ImgQuestionC = req.files['imgQuestionC'][0].path.split('/').slice(1).join('/');
        } else {
            games.questionResultC.ImgQuestionC = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
        }
        games.save((err, doc) => {
            if (!err)
                res.json({
                    status: 200
                });
            else {
                console.log('Error during record insertion :' + err);
            }
        });
    } else { // req có id sẽ hiểu là đang update
        // games.title = req.body.title;
        if (req.file) {
            req.body.images = req.file.path.split('/').slice(1).join('/');
        } else {
            req.body.images = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
        }
        Games.findOneAndUpdate({
            _id: req.body._id
        }, req.body, {
            new: true
        }, (err, doc) => {
            if (!err) {
                res.json({
                    status: 200
                });
            } else {
                console.log('Error during record update:' + err);
            }
        });
    }
})
router.get('/list', (req, res) => { //lấy toàn bộ employee
    Games.find((err, docs) => { //tìm toàn bộ 
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Games list :' + err);
        };
    });
});
router.get('/list/:subject', (req, res) => { //lấy toàn bộ employee
    console.log("xin chao"+req.params.subject);

    Games.find({ "categoryvocabulary": req.params.subject},(err, docs) => { //tìm toàn bộ 
        if (!err) {
            console.log(docs);
            res.json(docs);
        } else {
            console.log('Error in retrieving Games list :' + err);
        };
    });
});
router.get('/listcontent', (req, res) => { //lấy toàn bộ employee
    GameContentSchema.find((err, docs) => { //tìm toàn bộ 
        if (!err) {
            res.json(docs);
        } else {
            console.log('Error in retrieving Games list :' + err);
        };
    });
});
router.get('/generate', async (req, res) => { //
     await GameContentSchema.deleteMany({}, function(err) {
        if (err) {
            console.log(err)
        } else {
            res.end('success');
        }
    }
    );
    let gameId = []
    let dem = 0;
    let count = 0;

    await Games.find((err, docs) => { //tìm toàn bộ 
        if (!err) {
            // res.json(docs);
            // console.log(docs);
            docs.sort((a, b) => a.categoryvocabulary > b.categoryvocabulary);
            dem++;
            // if(dem<=10){
            for (let i = 0; i < docs.length; i++) {
                count++;
                let gameContentSchema = new GameContentSchema();
                gameContentSchema.categoryvocabulary = docs[i].categoryvocabulary
                gameContentSchema.vocabularygame = docs[i].vocabularygame;
                gameContentSchema.spellingvocabulary = docs[i].spellingvocabulary;
                gameContentSchema.questionResultA = docs[i].questionResultA;
                gameContentSchema.questionResultB = docs[i].questionResultB;
                gameContentSchema.questionResultC = docs[i].questionResultC
                gameContentSchema.questionResultRight = docs[i].questionResultRight
                gameContentSchema.save((err, doc) => { //thêm dữ liệu vào database
                    if (!err) //nếu thành công
                        console.log('them thanh cong2');
                    else { //nếu lỗi
                        console.log('Error during record insertion : ' + err);
                    }
                });
            }
            // }

        } else {
            console.log('Error in retrieving Games list :' + err);
        };
    });
});

router.get('/delete/:id', (req, res) => {
    console.log("a" + req.params.id)
    Games.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.json({
                status: 200
            });
        } else {
            console.log('Error in Games delete:' + err);
        }
    });
});
router.get('/:id', (req, res) => {
    Games.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.json(doc);
        } else {
            console.log('Error in Games update:' + err);
        }
    });

});

module.exports = router;