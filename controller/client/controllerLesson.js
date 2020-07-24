const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Lesson = require("../../models/lessonContentModel");

router.get('/list3', (req, res) => {//lấy toàn bộ employee
    Lesson.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            // console.log('Error in retrieving news list :' + err);
        };
    }).sort({points : -1}).limit(3);
});
router.get('/list5', (req, res) => {//lấy toàn bộ employee
    // console.log("list5");
    Lesson.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            // console.log('Error in retrieving news list :' + err);
        };
    }).sort({points : -1}).limit(5);
});
router.get('/:id',async (req, res) => {
   console.log("gia tri id: ",req.params.id);
   let data= await Lesson.findById(req.params.id).exec();

   if(data) return res.json(data);
});
module.exports = router;