const express = require("express");
require("dotenv").config();

const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
    res.render("index.ejs", { withProxy: false });
});

app.get("/withProxy", (_req, res) => {
    res.render("index.ejs", { withProxy: true });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
