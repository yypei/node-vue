var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.type('html');
    res.render('index', { title: 'Express' });
  // res.send('../dist/index.html');
});


module.exports = router;
