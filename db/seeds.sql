INSERT INTO department (id, name)
VALUES (1, "ADMINISTRATION"),
        (2, "ENGINEERING"),
        (3, "ACCOUNTING"),
        (4, "HUMAN RESOURCES"),
        (5, "SALES"),
        (6, "FACILITIES");

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "Software Developer", 120000, 2),
        (2, "Lead Engineer", 160000, 2),
        (15, "Engineering Manager", 200000, 2),
        (3, "Accountant", 80000, 3),
        (4, "Accounting Manager", 160000, 3),
        (5, "Recruiter", 80000, 4),
        (6, "HR Manager", 150000, 4),
        (7, "HR Assistant", 60000, 4),
        (8, "Sales Agent", 70000, 5),
        (9, "Lead Sales Agent", 125000, 5),
        (10, "Sales Manager", 160000, 5),
        (11, "Repair Technician", 70000, 6),
        (12, "Facilities Manager", 160000, 6),
        (13, "CEO", 300000, 1),
        (14, "CFO", 300000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gloria", "Esteban", 9, 10),
        ("Ricky", "Martin", 11, 12),
        ("Rocky", "Balboa", 7, 6),
        ("Adrien", "Whatshername", 6, 13),
        ("Poindexter", "Pointypants", 3, 4),
        ("Christina", "Aguilera", 1, 12),
        ("Chester", "McArthur", 12, 13),
        ("William", "Butlingham", 4, 14),
        ("Felicity", "Ferocious", 14, null),
        ("Oswald", "Obnoxious", 13, null),
        ("Kitty", "Smiffs", 2, 15),
        ("Roger", "Kumar", 15, 13),
        ("Chandra", "Priyaat", 10, 14),
        ("Dietrich", "Kolmszt", 8, 9),
        ("Emiliano", "Gueye", 5, 6);
      


