const mongoose = require("mongoose");

//비밀번호 암호화를 위하여 사용
const bcrypt = require("bcrypt");
const saltRounds = 10;

//토큰 생성을 위해 사용
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({

  name: {
    type: String,
    maxlaength: 50,
    unique: 1
  },
  id: {
    type: String,
    unique: 1
  },
  password: {
    type: String,  
    minlength: 5,
  },
  token: {
    type: String
  }
});






//====================================
//
//           비밀번호 암호화
// 비밀번호 암호화 하기! bycript의 salt를 이용!
// 몽고DB 매서드 Pre 를 이용
// function( next )가 실행 된 후 save 매서드로 보내준다.
//
//====================================
userSchema.pre('save', function (next) {
   
    //비밀번호 값을 가져온다.
    //this = 현재 폴더의 Schema
    var user = this;

    console.log(user)

  // User 정보를 바꿀 때마다 해시 설정을 하는 것을 막기 위해설정
    if (user.isModified('password')) {

        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err);

            //비밀번호 가져오는 것을 성공했을 경우
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;

                //비밀번호를 해시값으로 대체하는 것을 성공했을 경우 아래를 실행시킴
                next()
            });
        });
    }else{
        next()
  }
});

//====================================
//
//          로그인 시
//          비밀번호 체크
//
//====================================
userSchema.methods.comparePassword = function(plainPassword, cb) {
    //비밀번호가 암호화 되어있기 때문에 다시 변환 해줘야 함
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch);
    })
}


//====================================
//
//           토큰 만들기
//
//====================================

userSchema.methods.generateToken = function(cb) {
    
    var user = this;

    //jsonwebtoken을 이용해서 token을 생성하기

    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    //user._id + 'secretToken' = tokenExp
    
    user.token = token
    user.save(function(err, user){
        if(err) return cb(err);
        cb(null, user)
    })
}


userSchema.statics.findByToken = function (token, cb) {
  var user = this;

  jwt.verify(token,'secretToken',function(err, decode){
      user.findOne({"_id":decode, "token":token}, function(err, user){
          if(err) return cb(err);
          cb(null, user);
      })
  })
}


const User = mongoose.model('User', userSchema);

module.exports = User


