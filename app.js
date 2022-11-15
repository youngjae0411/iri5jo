require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true})) 
app.use(cors());

//쿠키토큰을 위하여 사용
const cookieParser = require('cookie-parser')
app.use(cookieParser());

mongoose.connect(process.env.URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))


app.set('port', process.env.PORT || 3000);

app.use('/login', require('./routes/login'))
app.use('/home', require('./routes/review'))
app.use('/register', require('./routes/register'))

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})

