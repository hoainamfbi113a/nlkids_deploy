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

module.exports = router;