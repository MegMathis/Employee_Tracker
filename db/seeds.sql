USE companyEmployee_db;

INSERT INTO departments (department_name) VALUES
    ("Sales"),
    ("Finance"),
    ("Customer Service"),
    ("Engineering");

INSERT INTO roles (job_title, salary, department_id) VALUES
    ("Sales Manager", 95000, 1),
    ("Junior Sales", 50000, 1),
    ("Controller", 105000, 2),
    ("Accounts Payable", 55000, 2),
    ("Client Support Lead", 65000, 3),
    ("Customer Support Agenet", 45000, 3),
    ("Technical Service Manager", 140000, 4),
    ("Software Engineer", 105000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES   
    ("Melissa", "Badowski", 1, NULL),
    ("Jen", "Murphy", 2, 1),
    ("Judy", "Teter", 3, NULL),
    ("Maura", "Kelly", 4, 3),
    ("Kath", "Donovan", 5, NULL),
    ("Angie", "Merlino", 6, 5),
    ("Lauren", "Monzo", 7, Null),
    ("Stacy", "Yansick", 8, 7);