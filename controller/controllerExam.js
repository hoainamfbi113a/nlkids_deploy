const express = require('express');
var router = express.Router();
var Exam = require('../models/exammodel');
var Lession = require('../models/lessonContentModel')
var Question =require('../models/questionmodel');
var Examcontent = require('../models/examcontenmodel');
var multer = require("multer");
var upload = multer({ dest: './public/uploads' })
const path = require('path');
const excelToJson = require('convert-excel-to-json');
const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/uploads");
        },
        filename: (req, file, cb) => {
            const fileName = file.originalname.toLowerCase().split(' ').join('-');
            cb(null, Date.now() + '-' + fileName)
        }
    });
var upload = multer({
        storage: storage,
        fileFilter: (req, file, cb) => {
            // if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            //     cb(null, true);
            // } else {
            //     cb(null, false);
            //     return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            // }
            cb(null, true);
        }
});
router.post('/excel',upload.single('file'),(req,res)=>{
    var exam = new Exam();//tạo một exam mới
    exam.examName = req.body.examName;
    exam.examTimeMake = req.body.examTimeMake;
    exam.classId = req.body.classId;
    exam.save((err, doc) => {//thêm dữ liệu vào database
        if (!err){//nếu thành công
        }
        else {//nếu lỗi
                console.log('Error during record insertion : ' + err);
        }
    });   
    console.log("them file excel");
    const input= req.file.path;
    const result = excelToJson({
        sourceFile: input,
        columnToKey: {
            A: 'questionName',
            B: 'questionResultA',
            C: 'questionResultB',
            D: 'questionResultC',
            E: 'questionResultD',
            F: 'questionResultRight'
        }
    });
    // console.log(result);
    let arrQuestion = result.Sheet1;
    for(let i=0 ; i< arrQuestion.length;i++){
        var examcontent = new Examcontent();
        examcontent.examId = req.body.examName;
        examcontent.questionName = arrQuestion[i].questionName;
        examcontent.questionResultA = arrQuestion[i].questionResultA;
        examcontent.questionResultB = arrQuestion[i].questionResultB;
        examcontent.questionResultC = arrQuestion[i].questionResultC;
        examcontent.questionResultD = arrQuestion[i].questionResultD;
        examcontent.questionResultRight = arrQuestion[i].questionResultRight;
        examcontent.save((err, doc) => {//thêm dữ liệu vào database
            if (!err)//nếu thành công
                console.log('them thanh cong2');
            else {//nếu lỗi
                    console.log('Error during record insertion : ' + err);
            }
        });
    }
})
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
async function insertdethidetail(req, res) {//thêm dữ liệu
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
        console.log("dddd");
      await Question.find(async(err, docs) => {//tìm toàn bộ
            if (!err) {
            for(var i=0; i<docs.length;i++)
            {
                if(docs[i].questionCategoryId=='Toán lớp 1'){
                   await Toan1.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Toán lớp 2'){
                    await Toan2.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Toán lớp 3'){
                    await Toan3.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Toán lớp 4'){
                    await Toan4.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Toán lớp 5'){
                    await Toan5.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 1'){
                    await AnhVan1.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 2'){
                    await AnhVan2.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 3'){
                    await  AnhVan3.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 4'){
                    await AnhVan4.push(docs[i]);
                }
                else if(docs[i].questionCategoryId=='Anh văn 5'){
                    await AnhVan5.push(docs[i]);
                }
                
            }
        }
        else {
            console.log('Error in retrieving Question list :' + err);
        }
        });
            for(var i=0 ; i<SoCauDe;i++){
                if(req.body.classId=='Toán lớp 1')
                {
                    insertExamContent(Toan1,req.body.examName)
                }
                else if(req.body.classId=='Toán lớp 2')
                {
                    insertExamContent(Toan2,req.body.examName)
                }
                else if(req.body.classId=='Toán lớp 3')
                {
                    insertExamContent(Toan3,req.body.examName)
                }
                else if(req.body.classId=='Toán lớp 4')
                {
                    insertExamContent(Toan4,req.body.examName)
                }
                else if(req.body.classId=='Toán lớp 5')
                {
                    insertExamContent(Toan5,req.body.examName)
                }
                else if(req.body.classId=='Anh văn 1')
                {
                    insertExamContent(AnhVan1,req.body.examName)
                }
                else if(req.body.classId=='Anh văn 2')
                {
                    insertExamContent(AnhVan2,req.body.examName)
                }
                else if(req.body.classId=='Anh văn 3')
                {
                    insertExamContent(AnhVan3,req.body.examName)
                }
                else if(req.body.classId=='Anh văn 4')
                {
                    insertExamContent(AnhVan4,req.body.examName)
                }
                else if(req.body.classId=='Anh văn 5')
                {
                    insertExamContent(AnhVan5,req.body.examName)
                }
        }
}
insertExamContent = (subject,examName) =>{
    var item = subject[Math.floor(Math.random()*subject.length)];
                    var examcontent = new Examcontent();//tạo một exam 
                    examcontent.questionName = item.questionName;
                    examcontent.questionResultA = item.questionResultA;
                    examcontent.questionResultB = item.questionResultB;
                    examcontent.questionResultC = item.questionResultC;
                    examcontent.questionResultD = item.questionResultD;
                    examcontent.questionResultRight = item.questionResultRight;
                    examcontent.examId = examName;
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