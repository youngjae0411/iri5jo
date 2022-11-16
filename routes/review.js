const express = require('express');
const router = express.Router();
var path = require('path');

const { Review } = require("../models/Review");

/* GET home page. */
router.get('/Review', (req, res) => {

  Review.find((err, doc) => {

    if(err) return res.status(400).send({ success : false, err : err})
    else return res.status(200).send(doc)
  })
})

//리뷰 디비에 저장
router.post("/saveReview", (req, res) => {

  const review = new Review(req.body)

  review.save((err, doc) => {
    console.log(req.body)
    if(err) return res.status(200).json({success : false, tit : req.body.title, st : req.body.star, cont : req.body.content })
    else res.status(200).json({success : true, msg : "등록완료!"})

  })
})

module.exports = router;