const express = require('express');
const bcrypt = require('bcrypt')//dùng để hash function
var router = express.Router();
    const mongoose = require('mongoose');
    var Member = require('../models/membermodel'); 

router.get('/', (req, res) => {
    res.render("member/addOrEdit", {
        member:[]
    });
});
router.post('/', (req, res) => {
    if (req.body._id === 'undefined'||req.body._id=='')
        {
            insertRecord(req, res);
        }
        else
        updateRecord(req, res);
});
function insertRecord(req, res) {//thêm dữ liệu
    // var member = new Member();//tạo một Member mới
    // bcrypt.hash(req.body.memberPass, 10, (err, hash) => {//hash mật khẩu người dùng đăng ký
    //         member.memberCategory = req.body.memberCategory;
    //         member.memberLogin = req.body.memberLogin;
    //         member.memberPass = hash;
    //         member.memberName = req.body.memberName;
    //         member.memberDate = req.body.memberDate;
    //         member.memberSex = req.body.memberSex;
    //         member.memberAddress = req.body.memberAddress;
    //         member.memberClassId = req.body.memberClassId;
    //         member.save((err, doc) => {//thêm dữ liệu vào database
    //             if (!err)//nếu thành công
    //                 // res.redirect('member/list');
    //                 console.log('them thanh cong');
    //             else {//nếu lỗi
    //                     console.log('Error during record insertion : ' + err);
    //             }
    //         });
    //   })

const userData = //nhận dữ liệu từ react gửi qua
  {
    memberLogin: req.body.memberLogin,
    memberPass: req.body.memberPass,
    memberClassId: req.body.memberClassId,
    memberCategory : '1',
    memberName : req.body.memberName,
    memberDate : req.body.memberDate,
    memberSex : req.body.memberSex,
    memberAddress : req.body.memberAddress,

  }
  
  Member.findOne({//Kiểm tra memberLogin người dùng đăng ký đã tồn tại hay không
    memberLogin: req.body.memberLogin
  })
    .then(member => {
      
      if (!member) {//Không trùng với bất kỳ memberLogin nào và tiến hành đăng ký
        bcrypt.hash(req.body.memberPass, 10, (err, hash) => {//hash mật khẩu người dùng đăng ký
          userData.memberPass = hash
          Member.create(userData)//tiến hành tạo tài khoản 
            .then(Member => {
              res.json({ status: Member.memberLogin + 'Registered!' })//trả lại cho reactjs nếu đăng ký thành công
            })
            .catch(err => {
              res.send('error: ' + err)//trả ra lỗi
            })
        })
      } else {
        res.send('User already exists')//xuất ra lỗi nếu memberLogin đã tồn tại
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    }) 
}

function updateRecord(req, res) {//tiến hành update dư liệu
  
    Member.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {//tìm user 
        //trùng với ID và update
        if (!err) { res.redirect('/admin/member/list'); }//tìm thấy và tiến hành update
        else {//không tìm thấy và không update
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {//lấy toàn bộ Member
    Member.find((err, docs) => {//tìm toàn bộ 
        if (!err) {
            // res.render("member/list", {
            //     list: docs//gán vào list và tiến hành render ra
            // });
             res.json(docs);
        }
        else {
            console.log('Error in retrieving Member list :' + err);
        }
    });
});
router.get('/:id', (req, res) => {//tìm id để tiến hành update
    Member.findById(req.params.id, (err, doc) => {
        if (!err) {//không có lỗi thì điền vào form dữ liệu update
            // res.render("member/addOrEdit", {
            //     viewTitle: "Update Member",
            //     member: doc
            // });
        }
        res.json(doc);
    });
});

router.get('/delete/:id', (req, res) => {//xóa Member
    Member.findByIdAndRemove(req.params.id, (err, doc) => {//tìm và xóa dữ liệu
        if (!err) {//không có lỗi khi tìm và tìm thấy
            res.redirect('/admin/member/list');
        }
        else { console.log('Error in Member delete :' + err); }//có lỗi và xuất lỗi ra
    });
});

module.exports = router;