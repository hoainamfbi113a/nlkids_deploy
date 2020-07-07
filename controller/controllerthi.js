const express = require('express');
var router = express.Router();
	var Question = require('../models/questionmodel');
	var Result =require('../models/resultexammodel');
	var Examcontent = require('../models/examcontenmodel');

router.get('/', (req, res) => {
    res.render("question/addOrEdit", {
        question:[]
    });
});
router.post('/', (req, res) => {
    // console.log(req.body.ans2);
    xulydethivachamdiem(req,res)
});
async function xulydethivachamdiem (req,res){
		var iddethi = req.body.iddethi;
		console.log(iddethi);
		var docss=[];
    await Examcontent.find({examId:iddethi},(err, docs) => {//tìm toàn bộ 
			if (!err) {
				// console.log(docs);
				for(var i=0 ;i <docs.length;i++)
				{
					docss.push(docs[i]);
				}
			}
			else {
				console.log('Error in retrieving Question list :' + err);
			}
		});
		setTimeout(()=>{
				// console.log(docss);
				var memberid = req.body.memberid;
				// var listcorrectanswer =[]
				var listcorrectanswers=[];
				var socaudung = 0;
				var arrAnsweruser = [];
				for (var i =0; i< 10; i++)
				{
					var nameinputans = 'ans'+i
					var answer = req.body[nameinputans];
					if (answer != null)
					{
						arrAnsweruser.push(answer);
						if (answer===docss[i].questionResultRight)
							{
								socaudung++;
							}
					}
				}
				var result = new Result();//tạo một Question mới
				result.socaudung = socaudung;
				result.socausai = 10-socaudung;
				result.examinationid = iddethi;
				result.memberid = memberid;
				result.save((err, doc) => {//thêm dữ liệu vào database
					if (!err)//nếu thành công
						console.log('them thanh cong');
					else {//nếu lỗi
							console.log('Error during record insertion : ' + err);
					}
				});
				res.send(socaudung.toString());
					},1000)
					
		
}

module.exports = router;