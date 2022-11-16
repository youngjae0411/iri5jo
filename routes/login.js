const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const User   = require("../models/User");

router.post('/login', (req, res) => {
  //============================================  
  //요청된 이메일을 데이터베이스에서 있는지 찾는다 =
  //============================================
    User.findOne({id: req.body.id}, (err, user) => {
      if(!user) {
        return res.json({
          loginSuccess: false,
          loginmsg: "제공된 아이디에 해당하는 유저가 없습니다."
        })
      }
    //요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch)
          return res.json({
            passwordSuccess: false,
            passmsg: "비밀번호가 틀렸습니다."})
          //비밀번호까지 맞다면 토큰을 생성하기.
        console.log('2')
          user.generateToken((err, user) => {
            console.log('3')
            if(err) return res.status(400).send(err); 
            // 토큰을 저장한다. 어디에? 쿠키, 로컬스토리지 ... 여기선 쿠키
            res.cookie("x_auth", user.token)
            .status(200)
            //response값을 아래 json객체로 정렬해 보내준다.
            .json({loginSuccess: true, userId: user._id, token: user.token})
        })
      })
    })
  })


  router.get('/users/auth', auth, (req, res) => {
    //여기까지 미들웨어를 통과해 왔다는 얘기는 authentication이 true라는 말
    res.status(200).json({
      _id: req.user._id,
      isAuth: true,
      id: req.user.id,
      name: req.user.name,
    })
  })

  router.get("/logout", auth , (req, res) => {

    User.findOneAndUpdate({ _id: req.user._id }, { token: ""}, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});


  router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAuth: true,
        name: req.user.name
    })
})

module.exports = router;