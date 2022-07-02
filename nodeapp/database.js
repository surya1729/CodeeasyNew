var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'myapp'
});
connection.connect(function (error) {
    if (error) {
        throw error;
    }
    console.log('Database is Connected!:)');
    // console.log(connection)
});
module.exports = connection;
