const express = require('express');
var router = express.Router();
    const mongoose = require('mongoose');
    var Employee = require('../models/employeemodel'); 

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        employee:[]
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
    var employee = new Employee();//tạo một employee mới
   // employee.em
    employee.fullname = req.body.fullname;//lấy dữ liệu từ input
    employee.email = req.body.email;
    employee.mobile = "a";
    employee.city = "b";
    employee.save((err, doc) => {//thêm dữ liệu vào database
        if (!err)//nếu thành công
            res.redirect('employee/list');
        else {//nếu lỗi
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {//tiến hành update dư liệu
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {//tìm user 
        //trùng với ID và update
        if (!err) { res.redirect('employee/list'); }//tìm thấy và tiến hành update
        else {//không tìm thấy và không update
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {//lấy toàn bộ employee
    Employee.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            // res.render("employee/list", {
            //     list: docs//gán vào list và tiến hành render ra
            // });
             res.json(docs);
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        };
    });
});
router.get('/:id', (req, res) => {//tìm id để tiến hành update
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {//không có lỗi thì điền vào form dữ liệu update
            res.render("employee/addOrEdit", {
                viewTitle: "Update Employee",
                employee: doc
            });
        }
        //res.json(doc);
    });
});

router.get('/delete/:id', (req, res) => {//xóa employee
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {//tìm và xóa dữ liệu
        if (!err) {//không có lỗi khi tìm và tìm thấy
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }//có lỗi và xuất lỗi ra
    });
});

module.exports = router;