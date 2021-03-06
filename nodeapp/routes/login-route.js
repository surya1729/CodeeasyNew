var express = require('express');
var router = express.Router();
var db = require('../database');
/* GET users listing. */
router.get('/login', function (req, res, next) {
    res.render('login-form');
});
router.post('/login', function (req, res) {
    var emailAddress = req.body.email;
    var password = req.body.password;
    var sql = 'SELECT * FROM users WHERE email =? AND password =?';
    db.query(sql, [emailAddress, password], function (err, data, fields) {
        if (err) throw err
        if (data.length > 0) {
            req.session.loggedinUser = true;
            req.session.emailAddress = emailAddress;
            res.redirect('/dashboard');
        } else {
            res.render('login-form', { alertMsg: "Your Email Address or password is wrong" });
        }
    })
})
module.exports = router;