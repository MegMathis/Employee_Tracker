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

CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(200) NOT NULL,
    last_name VARCHAR (200) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES roles (role_id),
    FOREIGN KEY (manager_id) REFERENCES employees(employee_id)
);




