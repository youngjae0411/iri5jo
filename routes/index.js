const express = require('express');
const app = express();
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Hello')
})

module.exports = router;