DROP DATABASE IF EXISTS companyEmployee_db;
CREATE DATABASE companyEmployee_db;
USE companyEmployee_db;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR (50) NOT NULL
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    job_title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(dept_id)
);
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
    // Second query to get Manager names
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
            [answer.firstName, answer.lastName, answer.roleId, answer.managerId],
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
CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR (200) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);




