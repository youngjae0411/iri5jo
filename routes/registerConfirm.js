const { response } = require('express');
const express = require('express');
const { appendFile } = require('fs');
const router = express.Router();

// 회원가입 시 필요한 유저스키마를 가져옴
const User = require("../models/User");


//==================================
//
//           아이디 검사
//
//==================================
// 회원가입 라우터 만들기
router.post('/register/confirm/id', (req, res) => {
    //요청된 이메일을 데이터베이스에서 있는지 찾는다.

    User.findOne({id: req.body.id}, (err, user) => {
      if(!user) {
        return res.json({ id : false })
      } else {
        return res.json({ id : true } )
      }
  })
})

//==================================
//
//           닉네임 검사
//
//==================================
// 회원가입 라우터 만들기
router.post('/register/confirm/name', (req, res) => {
  //요청된 이메일을 데이터베이스에서 있는지 찾는다.

  console.log(response)
  
  User.findOne({name: req.body.name}, (err, user) => {
    if(!user) {
      return res.json({ name : false })
    } else {
      return res.json({ name : true } )
    }
})
})





module.exports = router;