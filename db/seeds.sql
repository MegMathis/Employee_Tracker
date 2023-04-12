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
    ("Software Engineer", 105000, 4),
    ("Technical Service Manager", 140000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES   
    ("Mitch", "Toub", 1, 1),
    ("Jake", "Smith", 2, 1),
    ("Mike", "Schimony", 3, 3),
    ("Sara", "Bareilles", 4, 3),
    ("Brandi", "Carlile", 5, 5),
    ("Jeff", "Clark", 6, 5),
    ("Steve", "Forster", 7, 8),
    ("Kyle", "Roche", 8, 7);