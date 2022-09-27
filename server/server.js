const express = require("express");
const cors = require("cors")
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


// middleware
app.use(express.static(path.join(__dirname, "./public")));

// serving up image
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public"));
// });

// serving up html 
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/html/home.html"));
// });

// serving up css
// app.get("/styles", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/css/home.css"))
// })

const port = process.env.PORT || 4040;

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});