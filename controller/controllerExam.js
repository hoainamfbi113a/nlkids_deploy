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
        var AnhVan1=[];
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
                else{
                    AnhVan1.push(docs[i]);
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
                    var item = Toan1[Math.floor(Math.random()*Toan1.length)];
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
                else if(req.body.classId=='Toán lớp 2')
                {
                    var item = Toan2[Math.floor(Math.random()*Toan2.length)];
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
                else
                {
                    var item = AnhVan1[Math.floor(Math.random()*AnhVan1.length)];
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
            }
            
           
        }
        // function b(){
        //     for(var i=0 ; i< SoCauTB;i++){
        //         var item = Toan2[Math.floor(Math.random()*Toan2.length)];
        //         var examcontent = new Examcontent();
        //         examcontent.questionName = item.questionName;
        //         examcontent.questionResultA = item.questionResultA;
        //         examcontent.questionResultB = item.questionResultB;
        //         examcontent.questionResultC = item.questionResultC;
        //         examcontent.questionResultD = item.questionResultD;
        //         examcontent.questionResultRight = item.questionResultRight;
        //         examcontent.examId = req.body.examName;
            
        //         examcontent.save((err, doc) => {//thêm dữ liệu vào database
        //             if (!err)//nếu thành công
        //                 // res.redirect('exam/list');
        //                 console.log('them thanh cong3');
        //             else {//nếu lỗi
        //                     console.log('Error during record insertion : ' + err);
        //             }
        //         });
        //     }
        // }
        // function c(){
        //       for(var i=0 ; i< SoCauKho;i++){
        //         var item = AnhVan1[Math.floor(Math.random()*AnhVan1.length)];
        //         var examcontent = new Examcontent();
        //         examcontent.questionName = item.questionName;
        //         examcontent.questionResultA = item.questionResultA;
        //         examcontent.questionResultB = item.questionResultB;
        //         examcontent.questionResultC = item.questionResultC;
        //         examcontent.questionResultD = item.questionResultD;
        //         examcontent.questionResultRight = item.questionResultRight;
        //         examcontent.examId = req.body.examName;
        //         examcontent.save((err, doc) => {//thêm dữ liệu vào database
        //             if (!err)//nếu thành công
        //                 // res.redirect('exam/list');
        //                 console.log('them thanh cong4');
        //             else {//nếu lỗi
        //                     console.log('Error during record insertion : ' + err);
        //             }
        //         });
        //     }
        // }
        setTimeout(a,3000);
        // setTimeout(b,3000);
        // setTimeout(c,3000);
        
      
       
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
router.get('/list/:id', (req, res) => {//lấy toàn bộ exam
    console.log('vao');
    Exam.find({classId:req.params.id},(err, docs) => {//tìm toàn bộ 
        if (!err) {
             res.json(docs);
        }
        else {
            console.log('Error in retrieving exam list :' + err);
        }
    });
    
});
// router.get('/list12', (req, res) => {//lấy toàn bộ exam
//     insertdethidetail(req,res);
//     Exam.find((err, docs) => {//tìm toàn bộ 
//         if (!err) {
//             res.render("exam/list", {
//                 list: docs//gán vào list và tiến hành render ra
//             });
//              //res.json(docs);
//         }
//         else {
//             console.log('Error in retrieving exam list :' + err);
//         }
//     });
// });

router.get('/:id', (req, res) => {//tìm id để tiến hành update
    Exam.findById(req.params.id, (err, doc) => {
        if (!err) {//không có lỗi thì điền vào form dữ liệu update
            // res.render("exam/addOrEdit", {
            //     viewTitle: "Update exam",
            //     exam: doc
            // });
             res.json(doc);
        }
       
    });
});

router.get('/delete/:id', (req, res) => {//xóa exam
    Exam.findByIdAndRemove(req.params.id, (err, doc) => {//tìm và xóa dữ liệu
        if (!err) {//không có lỗi khi tìm và tìm thấy
            res.redirect('/admin/exam/list');
        }
        else { console.log('Error in exam delete :' + err); }//có lỗi và xuất lỗi ra
    });
});


module.exports = router;