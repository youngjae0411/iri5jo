const express = require('express');
const router = express.Router();
var path = require('path');
const http = require('http');




const { Review } = require("../models/Review");

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.resolve('public/index.html'))
})

//리뷰 디비에 저장
router.post("/saveReview", (req, res) => {

  const review = new Review(req.body)

  review.save((err, doc) => {
    console.log(err)
    console.log(doc)
    if(err) return res.status(400).send(err)
    else res.redirect('/home')
  })
})

module.exports = router;