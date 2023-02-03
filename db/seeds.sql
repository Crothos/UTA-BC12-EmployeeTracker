INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 60000, 1),
      ("Salesperson", 45000, 1),
      ("Lead Engineer", 150000, 2),
      ("Software Engineer", 80000, 2),
      ("Account Manager", 75000, 3),
      ("Accountant", 65000, 3),
      ("Legal Team Lead", 175000, 4),
      ("Lawyer", 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Sierra", 1, null),
       ("Mike", "Hawkins", 2, 1),
       ("Ashley", "Martinez", 3, null),
       ("Kevin", "Lincoln", 4, 3),
       ("Kunal", "Chara", 5, null),
       ("Malia", "Goodwin", 6, 5),
       ("Sarah", "Totten", 7, null),
       ("Tom", "Leal", 8, 7);