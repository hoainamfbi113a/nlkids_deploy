const express = require('express');
var router = express.Router();
    var Result = require('../models/resultexammodel'); 

router.get('/list', (req, res) => {//lấy toàn bộ Question
	Result.find((err, docs) => {//tìm toàn bộ 
			if (!err) {
				res.json(docs);
			}
			else {
				console.log('Error in retrieving Question list :' + err);
			}
		});
	});

 router.get('/listtop', async (req, res) => {//lấy toàn bộ Question
	Result.find((err, docs) => {//tìm toàn bộ 
			if (!err) {
				// res.json(docs);
				docs.sort((a, b) => parseFloat(b.socaudung) - parseFloat(a.socaudung));
				
				const uniqueAges = [...new Set( docs.map(obj => obj.memberid)) ];
				// console.log(uniqueAges);
				res.json(uniqueAges);
			}
			else {
				console.log('Error in retrieving Question list :' + err);
			}
		});
	});

module.exports = router;