const express = require('express');
var router = express.Router();
    var Question = require('../models/questionmodel'); 
    var Examcontent = require('../models/examcontenmodel');

router.get('/', (req, res) => {
    res.render("question/addOrEdit", {
        question:[]
    });
});
router.post('/', (req, res) => {
    console.log(req.body._id+'  a');
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});
function insertRecord(req, res) {//thêm dữ liệu
    var question = new Question();//tạo một Question mới
    question.questionCategoryId = req.body.questionCategoryId;
    question.questionId = req.body.questionId;
    question.questionName = req.body.questionName;
    question.questionResultA = req.body.questionResultA;
    question.questionResultB = req.body.questionResultB;
    question.questionResultC = req.body.questionResultC;
    question.questionResultD = req.body.questionResultD;
    question.questionResultRight = req.body.questionResultRight;
    question.save((err, doc) => {//thêm dữ liệu vào database
        if (!err)//nếu thành công
            // res.redirect('Question/list');
            console.log('them thanh cong');
        else {//nếu lỗi
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {//tiến hành update dư liệu
    Question.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {//tìm user 
        //trùng với ID và update
        if (!err) { res.redirect('/admin/question/list'); }//tìm thấy và tiến hành update
        else {//không tìm thấy và không update
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {//lấy toàn bộ Question
    Question.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving Question list :' + err);
        }
    });
});
router.get('/list/:id', (req, res) => {//lấy toàn bộ Question
    console.log(req.params.id);
    Examcontent.find({examId:req.params.id},(err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
           // console.log(docs);
        }
        else {
            console.log('Error in retrieving Question list :' + err);
        }
    });
});
router.get('/:id', (req, res) => {//tìm id để tiến hành update
    console.log('update1');
    Question.findById(req.params.id, (err, doc) => {
        if (!err) {//không có lỗi thì điền vào form dữ liệu update
            res.json(doc);
        }
        
    });
});

router.get('/delete/:id', (req, res) => {//xóa Question
    Question.findByIdAndRemove(req.params.id, (err, doc) => {//tìm và xóa dữ liệu
        if (!err) {//không có lỗi khi tìm và tìm thấy
            res.redirect('/admin/question/list');
        }
        else { console.log('Error in Question delete :' + err); }//có lỗi và xuất lỗi ra
    });
});

module.exports = router;