var express = require('express');
var passport = require('passport');
var app = express();
var querydb = require('./query_db');
var bodyParser = require('body-parser');
require('./passport');


//configure express
var cors = require('cors');
app.use(cors({credentials: true, origin: true}));
app.all(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//auth
const auth = require('./routes/auth');
app.use('/auth', auth);


//user.js
const user = require('./routes/user');
app.use('/user', passport.authenticate('jwt', { session: false }), user);

//user.js
const product = require('./Routes/Products');
app.use('/Products', passport.authenticate('jwt', { session: false }), product);
app.use('/Products/Add',passport.authenticate('jwt', { session: false }),  product);
app.use('/Products/Upload',passport.authenticate('jwt', { session: false }),  product);
//app.use('/Products/Add1',  product);

//Students.js
const student = require('./StudentManagement/Students');
 app.use('/Students', passport.authenticate('jwt', { session: false }), student);
//app.use('/Students', student);

//add api listener from signup page
var signup = require('./UserManagement/SignUp');
app.use('/UserManagement', signup);


//home page
app.get('/',(req,response)=>{

    querydb.QueryDb('select top 2 * from dbo.Student').then(function (data) {

        //console.log(data);
        response.send(data);

    }).catch(function (ex) {
        console.log(ex);
        console.log("Promise Rejected");
    });
    

});
app.post('/', function (req, res) {
    res.send('POST request to the homepage')
  });


//starting server
var server = app.listen(5000,()=>{
    console.log("Server is running");
    
})
