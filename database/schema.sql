CREATE TABLE towns_table(
    id serial PRIMARY KEY,
    towns VARCHAR(2)
);

CREATE TABLE registration_table(
    id serial,
    registrations VARCHAR(11) NOT NULL,
    town_id int, 
    FOREIGN KEY (town_id) REFERENCES towns_table(id)
);