CREATE DATABASE IF NOT EXISTS companydb;

CREATE TABLE employe(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT,
    PRIMARY KEY (id)
);

DECRIBE employe;

INSERT INTO employee VALUES (1, 'Henry', 1000), (2, 'Joe', 2546), (3, 'Sam', 1234), (4, 'Max', 2000);