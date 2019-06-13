var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code Immersives' }); // in the body look for title wrapped in <%EJS%>
  //res.send('HEY FROM INDEX ROUTER') //send this string to the body
  
});

module.exports = router;
