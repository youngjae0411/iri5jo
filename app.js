require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose')


mongoose.connect(process.env.URL)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))


app.set('port', process.env.PORT || 3000);

app.use('/home', require('./routes/index'))

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중')
})

