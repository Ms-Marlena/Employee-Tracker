USE employeeTracker_db;

INSERT INTO department (id, department_name)
VALUES  (1,"Sales"),
        (2, "Engineering"),
        (3, "Finance"),
        (4, "Legal");

INSERT INTO role (id, job_title, department_id, salary)
VALUES  (1, "Sales Lead", 1, 100000.00),
        (2, "Salesperson", 1, 80000.00),
        (3, "Lead Engineer", 2, 150000.00),
        (4, "Software Engineer", 2, 120000.00),
        (5, "Account Manager", 3, 160000.00),
        (6, "Accountant", 3, 125000.00),
        (7, "Legal Team Lead", 4, 250000.00),
        (8, "Lawyer", 4, 190000.00);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES  (1, "John", "Doe", 1, null),
        (2, "Mike", "Chan", 2, null),
        (3, "Ashley", "Rodriguez", 3, null),
        (4, "Kevin", "Tupik", 4, null),
        (5, "Kunal", "Singh", 5, null),
        (6, "Malia", "Brown", 6, null),
        (7, "Sarah", "Lourd", 7, null),
        (8, "Tom", "Allen", 8, null);