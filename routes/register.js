const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

var path = require('path');

// 회원가입 시 필요한 유저스키마를 가져옴
const User = require("../models/User");

/* 페이지에 띄우는 것 */
router.get('/register', (req, res) => {
    res.sendFile(path.resolve('public/register.html'))
})


//==================================
//
//             register
//              회원가입
//
//==================================
// 회원가입 라우터 만들기
router.post('/register', (req, res) => {
    console.log(req.body)
  
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다
    const user = new User(req.body)
  
    // mongoDB에 저장을 해주기
    user.save((err, userInfo) => {
      if(err) return res.json({ success: false, msg : '중복 된 아이디 혹은 잘못 된 비밀번호 입니다.'})
      return res.status(200).json({
        success: true, msg : "회원가입을 성공하였습니다."
      })
    })
})


  module.exports = router;