const express = require("express");
const app = express();
const cors = require("cors");
const routerSignup = require("./routes/routeSignup");
const routerLogin = require("./routes/routeLogin");
const routerBarang = require("./routes/routeBarang");

// use dotenv
require("dotenv").config();
const port = process.env.PORT || 8000;

// using cors middleware
app.use(cors());

app.use("/signup", routerSignup);
app.use("/login", routerLogin);
app.use("/barang", routerBarang);


const start = async () => {
    await app.listen(port, () => {
        console.log(`server is listening on http://localhost:${port}`);
    });
};

start();