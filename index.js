const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

// connection to DB
const connection = mysql.createConnection({
  user: "root",
  password: "rootroot",
  database: "companyEmployee_db",
});

// main menu options
const mainMenu = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Exit",
    ],
  },
];

// function to inititialize
function init() {
  inquirer.prompt(mainMenu).then(function (input) {
    console.log("works");
  });
}

// view all departments

// view all roles

// view all employees

// add department

// add role

// add employee

// update employees role
