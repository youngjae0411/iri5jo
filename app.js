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

app.get('/', (req, res) => {
  res.sendFile(path.resolve('public/main.html'))
})

app.use('/api', require('./routes/login'))
app.use('/api', require('./routes/review'))
app.use('/api', require('./routes/register'))
app.use('/api', require('./routes/registerConfirm'))

var path = require('path');
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')))


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})

