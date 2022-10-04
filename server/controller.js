require("dotenv").config();

const {CONNECTION_STRING} = process.env;
const { Sequelize } = require("sequelize");
console.log(CONNECTION_STRING)

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: "postgres", 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});


module.exports = {
    // functions to server html to the server
    getHome: (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/home.html"))
    },
    getLinks: (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/links.html"))
    },
    getControl: (req, res) => {
        res.sendFile(path.join(__dirname, "../html/conrol.html"))
    },
    
    // functions to serve css to the server
    getHomeCss: (req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/home.css"))
    },
    getLinksCss: (req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/links.css"))
    },
    getControlCss: (req, res) => {
        res.sendFile(path.join(__dirname, "../public/css/control.css"))
    }
}