DROP DATABASE IF EXISTS companyEmployee_db;
CREATE DATABASE companyEmployee_db;
USE companyEmployee_db;

DROP TABLE IF EXISTS departments;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employees;

CREATE TABLE departments (
    department_id INT AUTO_INCREMENT NOT NULL,
    department_name VARCHAR (50) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE roles (
    role_id INT AUTO_INCREMENT NOT NULL,
    job_title VARCHAR(50) NOT NULL,
    salary


)

