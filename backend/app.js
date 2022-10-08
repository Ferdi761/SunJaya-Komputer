const express = require("express");
const app = express();
const cors = require("cors");
const homeController = require("./controllers/home");

// use dotenv
require("dotenv").config();
const port = process.env.PORT || 8080;

// using cors middleware
app.use(cors());

app.get("/", (req, res) => {
    res.status(201).send("sukses");
    return;
});

app.get("/test", homeController);

app.get("/ok", (req, res) => {
    console.log("halaman ok sukses");
});

const start = async () => {
    await app.listen(port, () => {
        console.log(`server is listening on http://localhost:${port}`);
    });
};

start();