const express = require('express');
var router = express.Router();
    var Exam = require('../models/exammodel');
    var Question =require('../models/questionmodel');
    var Examcontent = require('../models/examcontenmodel');
router.get('/', (req, res) => {
    res.render("exam/addOrEdit", {
        exam:[]
    });
});
router.post('/', (req, res) => {
    
    // console.log(req.body._id+'  a');
    if (req.body._id == ''|| req.body._id === undefined)
        insertRecord(req, res);
        else
        updateRecord(req, res);
});
function insertRecord(req, res) {//thêm dữ liệu
  //  insertdethidetail(req,res)
    var exam = new Exam();//tạo một exam mới
    exam.examName = req.body.examName;
    // console.log(req.body.examName);
    // exam.examEasyNumber = req.body.examEasyNumber;
    // exam.examMediumNumber = req.body.examMediumNumber;
    // exam.examDifficultNumber = req.body.examDifficultNumber;
    exam.examTimeMake = req.body.examTimeMake;
    exam.classId = req.body.classId;
    exam.examCategoryNumber = req.body.examCategoryNumber;
    exam.save((err, doc) => {//thêm dữ liệu vào database
        if (!err){//nếu thành công
            // res.redirect('exam/list');
            console.log('them thanh cong1');
            insertdethidetail(req,res)
        }
        else {//nếu lỗi
                console.log('Error during record insertion : ' + err);
        }
    });   
   
}
 function insertdethidetail(req, res) {//thêm dữ liệu
        var Toan1=[];
        var Toan2=[];
        var Toan3=[];
        var Toan4=[];
        var Toan5=[];
        var AnhVan1=[];
        var AnhVan2=[];
        var AnhVan3=[];
        var AnhVan4=[];
        var AnhVan5=[];
        var SoCauDe= 10;
        // var SoCauTB= req.body.examMediumNumber;
      //  var SoCauKho= req.body.examDifficultNumber; 
        // var SoCauKho= 10 - (SoCauDe+SoCauTB); 
        Question.find((err, docs) => {//tìm toàn bộ
            if (!err) {
                //console.log(docs);
            for(var i=0; i<docs.length;i++)
            {
                if(docs[i].questionCategoryId=='Toán lớp 1'){
                    Toan1.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Toán lớp 2'){
                    Toan2.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Toán lớp 3'){
                    Toan3.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Toán lớp 4'){
                    Toan4.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Toán lớp 5'){
                    Toan5.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 1'){
                    AnhVan1.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 2'){
                    AnhVan2.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 3'){
                    AnhVan3.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 4'){
                    AnhVan4.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 5'){
                    AnhVan5.push(docs[i]);
                }
                
            }
        }
        else {
            console.log('Error in retrieving Question list :' + err);
        }
        });
        function a(){
            for(var i=0 ; i<SoCauDe;i++){
                // console.log(Toan1[Math.floor(Math.random()*Toan1.length)]);
                if(req.body.classId=='Toán lớp 1')
                {
                    // var item = Toan1[Math.floor(Math.random()*Toan1.length)];
                    // var examcontent = new Examcontent();//tạo một exam 
                    // examcontent.questionName = item.questionName;
                    // examcontent.questionResultA = item.questionResultA;
                    // examcontent.questionResultB = item.questionResultB;
                    // examcontent.questionResultC = item.questionResultC;
                    // examcontent.questionResultD = item.questionResultD;
                    // examcontent.questionResultRight = item.questionResultRight;
                    // examcontent.examId = req.body.examName;
                    // examcontent.save((err, doc) => {//thêm dữ liệu vào database
                    //         if (!err)//nếu thành công
                    //             // res.redirect('exam/list');
                    //             console.log('them thanh cong2');
                    //         else {//nếu lỗi
                    //                 console.log('Error during record insertion : ' + err);
                    //         }
                    //     });
                    insertExamContent(Toan1)
                }
                else if(req.body.classId=='Toán lớp 2')
                {
                    insertExamContent(Toan2)
                }
                else if(req.body.classId=='Toán lớp 3')
                {
                    insertExamContent(Toan3)
                }
                else if(req.body.classId=='Toán lớp 4')
                {
                    insertExamContent(Toan4)
                }
                else if(req.body.classId=='Toán lớp 5')
                {
                    insertExamContent(Toan5)
                }
                else if(req.body.classId=='Anh văn 1')
                {
                    insertExamContent(Anh1)
                }
                else if(req.body.classId=='Anh văn 2')
                {
                    insertExamContent(Anh2)
                }
                else if(req.body.classId=='Anh văn 3')
                {
                    insertExamContent(Anh3)
                }
                else if(req.body.classId=='Anh văn 4')
                {
                    insertExamContent(Anh4)
                }
                else if(req.body.classId=='Anh văn 5')
                {
                    insertExamContent(Anh5)
                }
        }
        setTimeout(a,3000);
}
}
insertExamContent = (subject) =>{
    var item = subject[Math.floor(Math.random()*subject.length)];
                    var examcontent = new Examcontent();//tạo một exam 
                    examcontent.questionName = item.questionName;
                    examcontent.questionResultA = item.questionResultA;
                    examcontent.questionResultB = item.questionResultB;
                    examcontent.questionResultC = item.questionResultC;
                    examcontent.questionResultD = item.questionResultD;
                    examcontent.questionResultRight = item.questionResultRight;
                    examcontent.examId = req.body.examName;
                    examcontent.save((err, doc) => {//thêm dữ liệu vào database
                            if (!err)//nếu thành công
                                // res.redirect('exam/list');
                                console.log('them thanh cong2');
                            else {//nếu lỗi
                                    console.log('Error during record insertion : ' + err);
                            }
                        });
}
function updateRecord(req, res) {//tiến hành update dư liệu
    Exam.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {//tìm user 
        //trùng với ID và update
        if (!err) { res.redirect('/admin/exam/list'); }//tìm thấy và tiến hành update
        else {//không tìm thấy và không update
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {//lấy toàn bộ exam
    Exam.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            console.log("vao exam route");
             res.json(docs);
        }
        else {
            console.log('Error in retrieving exam list :' + err);
        }
    });
    
});

router.get('/list/:subject', (req, res) => {//lấy toàn bộ exam
    console.log('vao');
    Exam.find({classId:req.params.subject},(err, docs) => {//tìm toàn bộ 
        if (!err) {
             res.json(docs);
        }
        else {
            console.log('Error in retrieving exam list :' + err);
        }
    });
});
router.get('/:id', (req, res) => {//tìm id để tiến hành update
    Exam.findById(req.params.id, (err, doc) => {
        if (!err) {
             res.json(doc);
        }
       
    });
});

router.get('/delete/:id', async (req, res) => {//xóa exam
  let examId = "";
  await Exam.findById(req.params.id, (err, doc) => {
        if (!err) {
            examId = doc.examName
        }
       
    });
    console.log("examId2"+examId)
    Exam.findByIdAndRemove(req.params.id, (err, doc) => {//tìm và xóa dữ liệu
        if (!err) {//không có lỗi khi tìm và tìm thấy
            res.redirect('/admin/exam/list');
            console.log("examId2"+examId);
            Examcontent.deleteMany({ examId: examId }, function(err, result) {
                if (err) {
                //   res.send(err);
                } else {
                //   res.send(result);
                }
              });
        }
        else { console.log('Error in exam delete :' + err); }//có lỗi và xuất lỗi ra
    });
});


module.exports = router;