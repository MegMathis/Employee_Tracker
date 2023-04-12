DROP DATABASE IF EXISTS companyEmployee_db;
CREATE DATABASE companyEmployee_db;
USE companyEmployee_db;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    dept_id INT AUTO_INCREMENT,
    department_name VARCHAR (50) NOT NULL,
    PRIMARY KEY (dept_id)
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT,
    job_title VARCHAR(50) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY(role_id),
    FOREIGN KEY (department_id) REFERENCES departments(dept_id)
);

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR (200) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL REFERENCES employees,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (role_id) REFERENCES roles (role_id)
);




