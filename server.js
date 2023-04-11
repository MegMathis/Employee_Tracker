const mysql = require("mysql2");

const connection = mysql.createConnection({
  user: "root",
  password: "rootroot",
  database: "companyEmployee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected at " + connection + threadId + "\n");
  connection.end();
});
