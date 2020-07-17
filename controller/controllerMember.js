const express = require('express');
const bcrypt = require('bcrypt')//dùng để hash function
var router = express.Router();
    const mongoose = require('mongoose');
    var Member = require('../models/membermodel'); 
    var multer = require("multer");
    var upload = multer({ dest: './public/uploads' })
    const path = require('path');
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
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
        }
    });
    
router.get('/', (req, res) => {
    res.render("member/addOrEdit", {
        member:[]
    });
});
router.post('/',upload.single('avatarContentImg'),upload.single('avatarContentImg2'), (req, res) => {
// router.post('/', (req, res) => {
    if (req.body._id === undefined||req.body._id === '')
        {
            insertRecord(req, res);
        }
        else
        updateRecord(req, res);
});
function insertRecord(req, res) {//thêm dữ liệu
    // console.log("insert2");
    const userData = //nhận dữ liệu từ react gửi qua
      {
        membergame: req.body.memberLogin,
        memberPass: req.body.memberPass,
        memberCategory : '1',
        memberName : req.body.memberName,
        memberDate : req.body.memberDate,
        memberSex : req.body.memberSex,
        memberAddress : req.body.memberAddress,

      }
      // console.log(req.body.memberLogin+"aaaaa");
      Member.findOne({//Kiểm tra memberLogin người dùng đăng ký đã tồn tại hay không
        memberLogin: req.body.memberLogin
      })
        .then(member => {
          if (!member) {//Không trùng với bất kỳ memberLogin nào và tiến hành đăng ký
                bcrypt.hash(req.body.memberPass, 10, (err, hash) => {//hash mật khẩu người dùng đăng ký
                // userData.memberPass = hash;
                let member = new Member();
                member.memberLogin = req.body.memberLogin;
                member.memberPass = req.body.memberPass;
                member.memberCategory = '1';
                member.memberName = req.body.memberName;
                member.memberDate = req.body.memberDate;
                member.memberSex = req.body.memberSex;
                member.memberAddress = req.body.memberAddress;
            if (req.file) {
                console.log(req.file.path.split('/').slice(1).join('/'));
                member.avatarContentImg = req.file.path.split('/').slice(1).join('/');
            }
            else {
                member.avatarContentImg = "uploads/1593760987298-screen-shot-2020-07-03-at-10.23.15.png"
            }
            console.log(member.avatarContentImg);
            member.save((err, doc) => {
                if (!err)
                    console.log("add member done")
                else {
                    console.log('Error during record insertion :' + err);
                }
            });
              // Member.create(userData)//tiến hành tạo tài khoản 
              //   .then(Member => {
              //     res.json({ status: Member.memberLogin + 'Registered!' })//trả lại cho reactjs nếu đăng ký thành công
              //   })
              //   .catch(err => {
              //     res.send('error: ' + err)//trả ra lỗi
              //   })
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