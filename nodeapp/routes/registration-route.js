var express = require('express');
var router = express.Router();
var db = require('../database');
// to display registration form 
router.get('/register', function (req, res, next) {
    res.render('registration-form');
});
// to store user input detail on post request
router.post('/register', function (req, res, next) {

    inputData = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
        mobileNumber: req.body.mobileNumber,
        class: req.body.class,
        school: req.body.school,
        message: req.body.message
    }
    // check unique email address
    var sql = 'SELECT * FROM users WHERE email =?';
    db.query(sql, [inputData.email_address], function (err, data, fields) {
        if (err) throw err
        if (data.length > 1) {
            var msg = inputData.email_address + "was already exist";
        } else if (req.body.confirm_password != inputData.password) {
            var msg = "Password & Confirm Password is not Matched";
        }else {

            // save users data into database
            var sql = 'INSERT INTO users SET ?';
            db.query(sql, inputData, function (err, data) {
                if (err) throw err;
            });
            var msg = "Your are successfully registered";
        }
        res.render('registration-form', { alertMsg: msg });
    })

});
module.exports = router;