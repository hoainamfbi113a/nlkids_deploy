const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
var News = require('../models/newsmodel');

router.get('/', (req, res) => {
    res.render("news/addNews");

});
router.post('/', (req, res) => {
    if (req.body._id == '') {
        let news = new News();
        news.title = req.body.title;
        news.images = req.body.images;
        news.contents = req.body.contents;
        news.timeUpdate = req.body.timeUpdate;
        news.save((err, doc) => {
            if (!err)
                res.redirect('news/list');
            else {
                console.log('Error during record insertion :' + err);
            }
        });
    }
    else {// req có id sẽ hiểu là đang update
        News.findOneAndUpdate({ _id: req.body._id },req.body,{new:true},(err,doc)=>{
            if (!err) 
            {
                 res.redirect('news/list');
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
            // res.render("news/list", {
                list: docs//gán vào list và tiến hành render ra
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
            res.redirect('/news/list');
        }
        else { console.log('Error in news delete:' + err); }
    });
});
router.get('/:id', (req, res) => {

    News.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('news/updateNews', {
                news: doc
            });

        }
        else { console.log('Error in news update:' + err); }
    });

});
module.exports = router;