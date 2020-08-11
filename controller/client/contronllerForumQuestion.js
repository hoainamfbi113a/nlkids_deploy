const express = require('express');
var router = express.Router();
var forumQuestion = require("../../models/forumQuestionModel")

router.get('/', (req, res) => {
    res.render("forumquestion/addOrEdit", {
        forumquestion:[]
    });
});
router.post('/', (req, res) => {
    // console.log(req.body._id+'  a');
    if (req.body._id == '' || req.body._id === undefined)
        insertRecord(req, res);
        else
        updateRecord(req, res);
});
function insertRecord(req, res) {//thêm dữ liệu
    var forumquestion = new forumQuestion();//tạo một forumQuestion mới
    // console.log(req.body.titleForumQuestion+"forum");
    console.log(req.body.memberForumQuestionAvatarContentImg+"name");
    forumquestion.titleForumQuestion = req.body.titleForumQuestion;
    
    forumquestion.classForumQuestion = req.body.classForumQuestion;
    forumquestion.memberForumQuestion.avatarContentImg = req.body.memberForumQuestionAvatarContentImg;
    forumquestion.memberForumQuestion.memberName = req.body.memberForumQuestionMemberName;
    forumquestion.save((err, doc) => {//thêm dữ liệu vào database
        if (!err)//nếu thành công
            // res.redirect('forumQuestion/list');
            console.log('them thanh cong forum');
        else {//nếu lỗi
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {//tiến hành update dư liệu
    forumQuestion.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {//tìm user 
        //trùng với ID và update
        if (!err) { res.redirect('/admin/forumquestion/list'); }//tìm thấy và tiến hành update
        else {//không tìm thấy và không update
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {//lấy toàn bộ forumQuestion
    // console.log("forum question")
    forumQuestion.find((err, docs) => {//tìm toàn bộ
        
        if (!err) {
            res.json(docs);
        }
        else {
            console.log('Error in retrieving forumQuestion list :' + err);
        }
    }).sort({created : -1});
});
router.get('/list/:id', (req, res) => {//lấy toàn bộ forumQuestion
    console.log(req.params.id);
    Examcontent.find({examId:req.params.id},(err, docs) => {//tìm toàn bộ 
        if (!err) {
            res.json(docs);
           // console.log(docs);
        }
        else {
            console.log('Error in retrieving forumQuestion list :' + err);
        }
    });
});
router.get('/:id', (req, res) => {//tìm id để tiến hành update
    console.log('update1');
    forumQuestion.findById(req.params.id, (err, doc) => {
        if (!err) {//không có lỗi thì điền vào form dữ liệu update
            res.json(doc);
        }
        
    });
});

router.get('/delete/:id', (req, res) => {//xóa forumQuestion
    forumQuestion.findByIdAndRemove(req.params.id, (err, doc) => {//tìm và xóa dữ liệu
        if (!err) {//không có lỗi khi tìm và tìm thấy
            res.json({
                status: 200
            });
        }
        else { console.log('Error in forumQuestion delete :' + err); }//có lỗi và xuất lỗi ra
    });
});
router.post('/ans/:id_question', (req, res) => {
    console.log("id_question"+req.body.answer);
    const answer = //nhận dữ liệu từ react gửi qua
      {
        memberName: req.body.memberName,
        answer: req.body.answer,
        avatarContentImg: req.body.avatarContentImg
      }
    forumQuestion.findOneAndUpdate(
        { _id: req.params.id_question }, 
        { $push: { memberForumReply: answer } },
        function (error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log(success);
            }
        });
});

module.exports = router;