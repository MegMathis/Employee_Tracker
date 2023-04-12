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
function showMenu() {
  inquirer
    .prompt([
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
    ])
    .then(function (result) {
      console.log("You entered: " + result.options);

      switch (result.options) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Exit":
          console.log(
            "Thank you for viewing the Employee Tracker.  Have a nice day!"
          );
          process.exit();
      }
    });
}

// view all departments

// view all roles

// view all employees

// add department

// add role

// add employee

// update employees role
