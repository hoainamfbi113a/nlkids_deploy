const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Lession = require('../models/lessonContentModel');
const multer = require("multer");
router.get('/', (req, res) => {
    res.render("news/addNews");

});
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

router.post('/', (req, res) => {
    if (req.body._id == '') {
        let lession = new Lession();
        lession.lessionContentSubjects = req.body.lessionContentSubjects;
        lession.lessionContentTitle = req.body.lessionContentTitle;
        lession.lessionContentImg = req.body.lessionContentImg;
        lession.lessionContentDetail = req.body.lessionContentDetail;
        lession.save((err, doc) => {
            if (!err)
                res.redirect('lession/list');
            else {
                console.log('Error during record insertion :' + err);
            }
        });
    }
    else {// req có id sẽ hiểu là đang update
        Lession.findOneAndUpdate({ _id: req.body._id },req.body,{new:true},(err,doc)=>{
            if (!err) 
            {
                 res.redirect('lession/list');
            }
            else {
            console.log('Error during record update:' + err);
                    }
         } );
        }
})
router.get('/list', (req, res) => {//lấy toàn bộ employee
    Lession.find((err, docs) => {//tìm toàn bộ 
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
            // res.render('lession/updatelession', {
            //     lession: doc
            // });
            res.json(doc);
        }
        else { console.log('Error in lession update:' + err); }
    });

});
const upload = multer({ storage: storage }).single("file");
router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post("/createPost", (req, res) => {
    let blog = new Blog({ content: req.body.content, writer: req.body.userID });

    blog.save((err, postInfo) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({ success: true, postInfo })
    })
})
module.exports = router;