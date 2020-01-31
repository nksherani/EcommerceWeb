
//routes/user.js
var express = require('express');
var app = express();
var querydb = require('../query_db');
var bcrypt = require('bcryptjs')
const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
    //console.log(req);
    res.send('respond with all products');
});


app.post('/Add', function (req, res) {
    console.log(req.body);
    var product = req.body;
        
        var query = 'insert into Product ( ProductName, ProductCode) values(\''+product.ProductName+'\',\''+product.ProductCode+'\')';
        console.log(query);
        querydb.QueryDb(query, (err, result) => {
            if(err)
                console.log(err);
                else
            console.log(result)
        });
        res.send('Product added successfully');
        //next();
    
  });

module.exports = router;