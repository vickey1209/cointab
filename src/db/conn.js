var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "vickey#1209"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});