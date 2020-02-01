
//routes/user.js
var express = require('express');
var querydb = require('../query_db');
var bcrypt = require('bcryptjs');
const router = express.Router();
var multer = require('multer');
const Excel = require('exceljs');
/* GET users listing. */
router.get('/', function (req, res, next) {
    //console.log(req);
    res.send('respond with all products');
});
// router.post('/add', function (req, res, next) {
//     //console.log(req);
//     res.send('post respond with all products');
// });

router.post('/Add', function (req, res, next) {
    console.log(req.body);
    var product = req.body;

    var query = 'insert into Product ( ProductName, ProductCode) values(\'' + product.ProductName + '\',\'' + product.ProductCode + '\')';
    console.log(query);
    querydb.QueryDb(query, (err, result) => {
        if (err)
            console.log(err);
        else
            console.log(result)
    });
    res.send('Product added successfully');
    next();

});

var excel = require('../Utils/Excel');
  //excel.exTest();


  //testread();


//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//     cb(null, 'public')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' +file.originalname )
//   }
// });
//var upload = multer({ storage: storage }).single('file')
const fs = require('fs');

var upload = multer({
    dest: 'images/'
})
router.post('/Upload', upload.single('file'), function (req, res) {
    console.log('------------------------------------------------');

    const testFolder = 'images';
    fs.rename('./images/'+req.file.filename, './images/'+req.file.originalname, function (err) {
        if (err) console.log('ERROR: ' + err);
    });
    fs.readdirSync(testFolder).forEach(file => {
        console.log(file);
    });
    //console.log(req.file.originalname);
    

    //var sheet = workbook.addWorksheet('naveed');
    //sheet.addRow("asdadasd").commit();
    //stream.pipe(workbook.xlsx.createInputStream());
    //console.log(workbook);
    // upload(req, res, function (err) {
    //     if (err instanceof multer.MulterError) {
    //         return res.status(500).json(err)
    //     } else if (err) {
    //         return res.status(500).json(err)
    //     }
    //return res.status(200).send(req.file)

    //});
    return res.status(200).send(req.file)

    //res.send('Products uploaded successfully');
    //next();

});
module.exports = router;