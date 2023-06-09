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
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add Department",
          "Add Role",
          "Add Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then(function (result) {
      console.log("You entered: " + result.options);

      switch (result.options) {
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Exit":
          console.log(
            "Thank you for viewing the Employee Tracker.  Have a nice day!"
          );
          process.exit();
      }
    });
}

// the functions
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
  let query = `SELECT r.role_id, r.job_title, d.department_name, r.salary
  FROM roles r
  INNER JOIN departments d ON r.department_id = d.dept_id`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    showMenu();
  });
}

// view all employees
function viewEmployees() {
  let query = `SELECT employees.employee_id, employees.first_name, employees.last_name,
    roles.job_title, roles.salary, departments.department_name,
    CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employees
    LEFT JOIN roles ON employees.role_id = roles.role_id
    LEFT JOIN departments ON roles.department_id = departments.dept_id
    LEFT JOIN employees manager ON manager.employee_id = employees.manager_id`;

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
        "INSERT INTO departments (department_name) VALUES(?)",
        [answer.deptName],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          console.log("Added new department");
          showMenu();
        }
      );
    });
}

// add role - role name, salary, and dept

function addRole() {
  let query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    if (err) throw err;
    const deptChoices = res.map(({ dept_id, department_name }) => {
      return {
        name: department_name,
        value: dept_id,
      };
    });
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
          type: "list",
          name: "deptId",
          message: "Which department does this role belong to?",
          choices: deptChoices,
        },
      ])
      .then(function (answer) {
        connection.query(
          "INSERT INTO roles (job_title, salary, department_id) VALUES (?, ?, ?)",
          [answer.roleTitle, answer.salaryAmt, answer.deptId],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            showMenu();
          }
        );
      });
  });
}

// add employee
function addEmployee() {
  let query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;
    const roleChoices = res.map(({ role_id, job_title }) => {
      return {
        name: job_title,
        value: role_id,
      };
    });
    // Second query to get Manager names - ASKBCS
    let query = "SELECT * FROM employees";
    connection.query(query, function (err, res) {
      if (err) throw err;
      const managerChoices = res.map(({ id, first_name, last_name }) => {
        return {
          name: `${first_name} ${last_name}`,
          value: id,
        };
      });
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
          },
          {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
          },
          {
            type: "list",
            name: "roleId",
            message: "What is the employee's role?",
            choices: roleChoices,
          },
          {
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices,
          },
        ])
        .then(function (answer) {
          connection.query(
            "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
            [
              answer.firstName,
              answer.lastName,
              answer.roleId,
              answer.managerId,
            ],
            function (err, res) {
              if (err) throw err;
              console.table(res);
              showMenu();
            }
          );
        });
    });
  });
}

// update employees role
function updateEmployeeRole() {
  let query = "SELECT * FROM employees";
  connection.query(query, function (err, res) {
    if (err) throw err;
    const updateEmpChoice = res.map(({ id, first_name, last_name }) => {
      return {
        name: `${first_name} ${last_name}`,
        value: id,
      };
    });
    // Second query to get roles
    let query = "SELECT * FROM roles";
    connection.query(query, function (err, res) {
      if (err) throw err;
      const updateEmpRoleChoice = res.map(({ role_id, job_title }) => {
        return {
          name: job_title,
          value: role_id,
        };
      });
      inquirer
        .prompt([
          {
            type: "list",
            name: "update",
            message: "Which employee would you like to update?",
            choices: updateEmpChoice,
          },
          {
            type: "list",
            name: "updateRole",
            message: "What role would you like to update the employee with?",
            choices: updateEmpRoleChoice,
          },
        ])
        .then(function (answer) {
          connection.query(
            "UPDATE employees SET role_id=? WHERE employee_id=?",
            [answer.updateRole, answer.update],
            function (err, res) {
              if (err) throw err;
              console.table(res);
              showMenu();
            }
          );
        });
    });
  });
}

function quit() {
  connection.end();
  process.exit();
}

showMenu();
