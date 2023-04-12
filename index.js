const mysql = require("mysql2");
const db = require(".");
const inquirer = require("inquirer");
const cTable = require("console.table");

// connection to database
const connection = mysql.createConnection({
  user: "root",
  password: "rootroot",
  database: "companyEmployee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected");
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

// here goes the functions
// view all departments
function viewAllDepartments() {
  // database
  let query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    showMenu();
  });
}

// view all roles
function viewAllRoles() {
  let query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    showMenu();
  });
}

// view all employees
function viewEmployees() {
  let query = "SELECT * FROM employees";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    showMenu();
  });
}

// add department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "deptName",
      message: "What is the name of the department?",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES(?)",
        [answer.deptName],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          showMenu();
        }
      );
    });
}

// add role - role name, salary, and dept_id
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleTitle",
        message: "What is the name of this role?",
      },
      {
        type: "input",
        name: "salaryAmt",
        message: "What is the salary for this role?",
      },
      {
        type: "input",
        name: "deptId",
        message: "What is the name of the department?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role (job_title, salary, department_id) VALUES (?, ?, ?)",
        [answer.roleTitle, answer.salaryAmt, answer.deptId, answer.managerID],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          showMenu();
        }
      );
    });
}

// add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "eFirstName",
        message: "What is the employee's first name?",
      },
      {
        type: "input",
        name: "eLastName",
        message: "What is the employee's last name?",
      },
      {
        type: "input",
        name: "eRole",
        message: "What is the role of the employee?",
      },
      {
        type: "input",
        name: "eManager",
        message: "Who is the employee's manager?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employees (first_name, last_name, role_id, manager_id VALUES (? ? ? ?)"[
          (answer.eFirstName, answer.eLastName, answer.eRole, answer.eManager)
        ],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          showMenu();
        }
      );
    });
}
// update employees role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "eUpdate",
        message: "Which employee would you like to update?",
      },
      {
        type: "input",
        name: "updateRole",
        message: "What role would you like to update the employee with?",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id=? WHERE first_name = ?",
        [update.eUpdate, answer.updateRole],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          showMenu();
        }
      );
    });
}

function quit() {
  connection.end();
  process.exit();
}

showMenu();
