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

// const getHome = getHome();
// const getLinks = getLinks();
// const getContol = getControl();
// const getHomeCss = getHomeCss();
// const getLinksCss = getLinksCss();
// const getControlCss = getControlCss();


module.exports = {
    
}
// functions to server html to the server
function getHome(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"))
};

function getLinks(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/links.html"))
};

function getContol(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/conrol.html"))
};

// functions to serve css to the server
function getHomeCss(req, res) {
    res.sendFile(path.join(__dirname, "../public/css/home.css"))
};

function getLinksCss(req, res) {
    res.sendFile(path.join(__dirname, "../public/css/links.css"))
};

function getControlCss(req, res) {
    res.sendFile(path.join(__dirname, "../public/css/control.css"))
};