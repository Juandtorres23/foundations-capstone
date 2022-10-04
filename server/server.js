require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { getHome, getLinks, getControl, getHomeCss, getLinksCss, getControlCss } = require("../server/controller")
const { SERVER_PORT } = process.env;
const { seed } = require("./seed.js")


const app = express();
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
app.get("/", getHome)
app.get("/links", getLinks)
app.get("/control", getControl)

// serving up css
app.get("/styles", getHomeCss)
app.get("/links-styles", getLinksCss)
app.get("/control-styles", getControlCss)


const port = process.env.PORT || 4040;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});