const express = require('express')
const users = express.Router()
const cors = require('cors')//cho phép truy cập
 const jwt = require('jsonwebtoken')//sử dụng token
const bcrypt = require('bcrypt')//dùng để hash function
const User = require("../../models/membermodel")
users.use(cors());

process.env.SECRET_KEY = 'secret'//secret môi trường

users.post('/register', (req, res) => {
  const today = new Date()
  const userData = //nhận dữ liệu từ react gửi qua
  {
    memberLogin: req.body.memberLogin,
    memberPass: req.body.memberPass,
    memberClassId: 'Toán lớp 1',
    memberCategory:'1',
    created: today
  }
  User.findOne({//Kiểm tra memberLogin người dùng đăng ký đã tồn tại hay không
    memberLogin: req.body.memberLogin
  })
    .then(user => {
      if (!user) {//Không trùng với bất kỳ memberLogin nào và tiến hành đăng ký
        bcrypt.hash(req.body.memberPass, 10, (err, hash) => {//hash mật khẩu người dùng đăng ký
          userData.memberPass = hash
          User.create(userData)//tiến hành tạo tài khoản 
            .then(user => {
              res.json({ status: user.memberLogin + 'Registered!' })//trả lại cho reactjs nếu đăng ký thành công
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
})

users.post('/login', (req, res) => {
  console.log(req.body.memberLogin+'  aaaa');
  User.findOne({
    memberLogin: req.body.memberLogin
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.memberPass, user.memberPass)&&user.memberCategory==="1") {//so sanh mat khau da hash
          // memberPasss match
          const payload = {//luu vao payload de gui token
            _id: user._id,
            memberClassId: user.memberClassId,
            memberLogin: user.memberLogin
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {//dang ky token user
            expiresIn: '1h'//thoi gian ton tai token
          })
          res.send(token)
       //   console.log('exist');
        } else {
          // memberPasss don't match
          res.send('User not exists')
        }
      } else {
        res.send('User not exists')
      }
    })
    .catch(err => {
      res.send(err)
    })
})
users.post('/loginadmin', (req, res) => {
  // console.log(req.body.memberCategory+'  aaaa');
  User.findOne({
    memberLogin: req.body.memberLogin
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.memberPass, user.memberPass)&&user.memberCategory===req.body.memberCategory) {//so sanh mat khau da hash
          // memberPasss match
          const payload = {//luu vao payload de gui token
            _id: user._id,
            memberClassId: user.memberClassId,
            memberLogin: user.memberLogin
          }
          let token = jwt.sign(payload, process.env.SECRET_KEY, {//dang ky token user
            expiresIn: '1h'//thoi gian ton tai token
          })
      
          res.send(token)
       //   console.log('exist');
        } else {
          // memberPasss don't match
          res.send('User not exists')
        }
      } else {
        res.send('User not exists')
      }
    })
    .catch(err => {
      res.send(err)
    })
})

users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)//dung de xac minh
  
  User.findOne({
    _id: decoded._id
  })
    .then(user => {
      if (user) {
        // console.log(user);
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = users
