require("dotenv").config();

const { DATABASE_URL } = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  seed: (req, res) => {
    sequelize.query(`
       

        DROP TABLE if EXISTS info;
        DROP TABLE if EXISTS comments;
        DROP TABLE if EXISTS controls;
        DROP TABLE if EXISTS brands;



        CREATE TABLE brands (
            brand_id SERIAL PRIMARY KEY,
            name VARCHAR(100)
            
        );

        CREATE TABLE controls (
            control_id SERIAL PRIMARY KEY,
            name VARCHAR(50),
            year VARCHAR(20),
            brand_id INTEGER REFERENCES brands(brand_id)
        );

  CREATE TABLE info (
            info_id SERIAL PRIMARY KEY,
            control_id INTEGER REFERENCES controls(control_id),
            info_small VARCHAR(200),
            info_large VARCHAR(2000)
        );

     CREATE TABLE comments (
            comment_id SERIAL PRIMARY KEY,
            control_id INTEGER REFERENCES controls(control_id),
            comment VARCHAR(1000)
            
        );
INSERT INTO brands (name)
        VALUES ('Playstation'),
            ('Nintendo'),
            ('Xbox');

   INSERT INTO controls (name, year, brand_id)
        VALUES ('PS5', 2020, 1),
            ('PS1', 1994, 1),
            ('GameCube', 2001, 2),
            ('N64', 1996, 2),
            ('Xbox 360', 2005, 3),
            ('Xbox Series X', 2020, 3);

   INSERT INTO info ( control_id, info_small, info_large)
        VALUES (1, '', ''),
            (2, '', ''),
            (3, '', ''),
            (4, '', ''),
            (5, '', ''),
            (6, '', '');

   INSERT INTO comments (control_id, comment)
        VALUES (1, ''),
            (2, ''),
            (3, ''),
            (4, ''),
            (5, ''),
            (6, '');
        `
      )
      .then(() => {
        console.log("DB seeded!");
        res.sendStatus(200);
      })
      .catch((err) => console.log("error seeding DB", err));
  },
};
