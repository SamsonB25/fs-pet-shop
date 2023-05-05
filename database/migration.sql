DROP TABLE IF EXISTS pets;

CREATE TABLE pets(
    id SERIAL,
    name CHAR(25),
    kind CHAR(25),
    age SMALLINT
);