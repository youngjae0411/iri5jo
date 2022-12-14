const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;


const reviewSchema = mongoose.Schema({

  title : {
    type : String,
    required : true
  },
  star : {
    type: String,
    required : true
  },
  content: {
    type : String,
    required : true
  },
  image :{
    type : String
  },
  writer : {
    type : String
  }

}, {timestamps: true})

const Review = mongoose.model('Review', reviewSchema);

module.exports = { Review }