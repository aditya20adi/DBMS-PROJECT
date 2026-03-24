CREATE TABLE Students (
    uid VARCHAR(10) PRIMARY KEY,
    name VARCHAR(50),
    age INT,
    course VARCHAR(20)
);


INSERT INTO Students (uid, name, age, course) VALUES
('U101', 'Aditya', 20, 'B.Tech'),
('U102', 'Riya', 22, 'B.Sc'),
('U103', 'Sameer', 21, 'B.Com'),
('U104', 'Anika', 19, 'B.A'),
('U105', 'Rahul', 23, 'B.Tech'),
('U106', 'Sneha', 20, 'B.Sc'),
('U107', 'Vikram', 24, 'B.Com'),
('U108', 'Pooja', 22, 'B.A'),
('U109', 'Karan', 21, 'B.Tech'),
('U110', 'Meera', 20, 'B.Sc');

SELECT * FROM Students;