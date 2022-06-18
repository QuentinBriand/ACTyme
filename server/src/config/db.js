var mysql      = require('mysql');

module.exports.pool = mysql.createConnection({
    database : process.env['MYSQL_DATABASE'],
    host     : process.env['MYSQL_HOST'],
    user     : process.env['MYSQL_USER'],
    password : process.env['MYSQL_ROOT_PASSWORD'],
});

module.exports.pool.connect();
