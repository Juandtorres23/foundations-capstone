require("dotenv").config();
const path = require("path");
// const controlContainer = document.querySelector("#contol-container");


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
  // functions to server html to the server
  getHome: (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/html/home.html"));
  },
  getLinks: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/links.html"));
  },
  getControl: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/html/control.html"));
  },

  // functions to serve css to the server
  getHomeCss: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/css/home.css"));
  },
  getLinksCss: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/css/links.css"));
  },
  getControlCss: (req, res) => {
    res.sendFile(path.join(__dirname, "../public/css/control.css"));
  },

//functions to serve js to the server
getHomeJs: (req, res) => {
  res.sendFile(path.join(__dirname, "../public/home.js"));
},

getControlJs: (req, res) => {
  res.sendFile(path.join(__dirname, "../public/cons.js"));
},
getGlobalJs: (req, res) => {
  res.sendFile(path.join(__dirname, "../public/global.js"));
},


  //fetching all the controllers from the db
  getControllers: (req, res) => {
    sequelize.query(` SELECT * FROM controls`)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err))
  },

  //fetching all the controllers and small info from db
  getControllersSmall: (req,res) => {
    sequelize.query(`SELECT a.control_id, a.name, a.imageurl, a.href, b.info_id, b.control_id, b.info_small
    FROM controls AS a
    JOIN  info AS b on a.control_id = b.control_id;`)
      // .then(dbRes => res.status(200).send(dbRes[0]))
      .then(dbRes => {
        const controllers = dbRes[0]
        res.status(200).send(controllers)
      })
      .catch(err => console.log(err))
  },

  //fetching all the playstation controllers and small info 
  getControllersByBrand: (req, res) => {
    sequelize.query(`SELECT a.control_id, a.name, a.imageurl, a.href, a.brand_id,b.control_id, b.info_small, c.brand_id, c.brand_name
    FROM controls AS a
    JOIN info AS b on a.control_id = b.control_id
    JOIN brands AS c on a.brand_id = c.brand_id;`)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err)) 
  },

  //fetching all the controllers and large info
  getControllerLarge: (req,res) => {
    sequelize.query(`SELECT a.control_id, a.name, a.year, a.imageurl, a.href, b.info_id, b.control_id, b.info_large 
    FROM controls AS a
    JOIN  info AS b on a.control_id = b.control_id;`)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err))
  },

  getComments: (req, res) => {
    sequelize.query(`SELECT a.comment_id, a.control_id, a.comment, a.commenter, b.control_id, b.name
    FROM comments AS a
    JOIN controls AS b on a.control_id = b.control_id;`)
      .then(dbRes => res.status(200).send(dbRes[0]))
      .catch(err => console.log(err))
  }, 

  postComments: (req, res) => {
    
    let { controlId, comment, commenter } = req.body;

    sequelize.query(`INSERT INTO comments ( control_id, comment, commenter)
    VALUES (${controlId}, '${comment}', '${commenter}')
    RETURNING *;
    `)
    .then(dbRes => res.status(200).send(dbRes[0]))
    .catch(err => console.log(err))
  }


};
