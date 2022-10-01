const express = require("express");
const app = express();

// use dotenv
require("dotenv").config();
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
    res.status(201).send("sukses");
    return;
});

const start = async () => {
    await app.listen(port, () => {
        console.log(`server is listening on http://localhost:${port}`);
    });
};

start();