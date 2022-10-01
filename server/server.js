require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { SERVER_PORT } = process.env;
const { seed } = require("./seed.js")



app.use(cors());
app.use(express.json());

app.get("/seed", seed)


// middleware
// app.use(express.static(path.join(__dirname, "../public/html/home.html")));

// serving up image
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public"));
// });

// serving up html 
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
});

app.get("/links", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/html/links.html"));
});

app.get("/control", function(req,res) {
    res.sendFile(path.join(__dirname, "../public/html/control.html"));
});



// serving up css
app.get("/styles", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/css/home.css"))
});

app.get("/links-styles", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/css/links.css"));
});

app.get("/control-styles", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/css/control.css"));
});


const port = process.env.PORT || 4040;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});