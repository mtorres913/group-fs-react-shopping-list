-- Don't forget to add your create table SQL 
CREATE TABLE "list" (
    "id" serial PRIMARY KEY,
    "name" varchar(80) NOT NULL,
    "quantity" varchar(128) NOT NULL,
    "unit" varchar(20),
    "purchased" varchar(20) DEFAULT 'No'
);
-- It is also helpful to include some test data
INSERT INTO list (name, quantity)
VALUES ('banana', '2'), 
('apple', '3'), 
('dog food', '2');

SELECT * FROM list ORDER BY name, quantity, unit DESC