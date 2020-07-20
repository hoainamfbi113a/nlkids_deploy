const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var Lesson = require("../../models/lessonContentModel");

router.get('/list', (req, res) => {//lấy toàn bộ employee
    Lesson.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving news list :' + err);
        };
    }).sort({points : -1}).limit(4);
});
router.get('/list5', (req, res) => {//lấy toàn bộ employee
    Lesson.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving news list :' + err);
        };
    }).sort({points : -1}).limit(5);
});
module.exports = router;