const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const port = process.env.PORT || 8000;

// use dotenv
require("dotenv").config();

// postgres db
const sequelize = require("./db/sequelize");

const routerSignup = require("./routes/routeSignup");
const routerLogin = require("./routes/routeLogin");
const routerBarang = require("./routes/routeBarang");

// using cors middleware
// let corsOptions = { origin: "http://localhost:3000" };
// app.use(cors(corsOptions));
app.use(cors());


app.use("/signup", routerSignup);
app.use("/login", routerLogin);
app.use("/barang", routerBarang);


const start = async () => {
    try {
        await sequelize.authenticate().then(() => {
            console.log("Connection has been established successfully.");
        });
        
        await app.listen(port, () => {
            console.log(`server is listening on http://localhost:${port}`);
        });
    }
    catch (err) {
        console.log(`failed to connect to database\n\n` + err);
    }
};

start();