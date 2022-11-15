const express = require('express');
const router = express.Router();

var path = require('path');

// 회원가입 시 필요한 유저스키마를 가져옴
const { User } = require("../models/User");

//토큰 인증을 위하여 사용
const { auth } = require('../middleware/auth')

/* 페이지에 띄우는 것 */
router.get('/', (req, res) => {
    res.sendFile(path.resolve('public/register.html'))
})


//==================================
//
//             register
//              회원가입
//
//==================================
// 회원가입 라우터 만들기
router.post('/', (req, res) => {
    console.log(req.body)
  
    // 회원가입 할 때 필요한 정보들을 client에서 가져오면 그것들을 데이터 베이스에 넣어준다
    const user = new User(req.body)
  
    // mongoDB에 저장을 해주기
    user.save((err, userInfo) => {
      if(err) return res.json({ success: false, err})
      return res.status(200).json({
        success: true 
      })
    })
})


//====================================
//
//           인증 기능 만들기
//       서버와 클라이언트 사이 연결
//
//====================================
router.get('/auth', auth, (req, res) => {

    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        name: req.user.name
    })

})
  
  module.exports = router;