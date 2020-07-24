const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var News = require("../../models/newsmodel");

router.get('/list', (req, res) => {//lấy toàn bộ employee
    News.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving news list :' + err);
        };
    }).sort({points : -1}).limit(5);
});
router.get('/listgoodstudent', (req, res) => {//lấy toàn bộ employee
    News.find({ "categoryNews": "newcategory2" },(err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving news list :' + err);
        };
    }).sort({points : -1}).limit(5);
});
router.get('/listneweducation', (req, res) => {//lấy toàn bộ employee
    News.find({ "categoryNews": "newcategory1" },(err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving news list :' + err);
        };
    }).sort({points : -1}).limit(5);
});
module.exports = router;