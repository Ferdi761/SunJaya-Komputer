const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const Sequelize = require("sequelize");
const port = process.env.PORT || 8000;

// setting up express router
const routerSignup = require("./routes/routeSignup");
const routerLogin = require("./routes/routeLogin");
const routerBarang = require("./routes/routeBarang");
const routerLogout = require("./routes/routeLogout");
// test all akun
const routerAkun = require("./routes/routeAkun");

// use dotenv
require("dotenv").config();

// using cors middleware
// let corsOptions = { origin: "http://localhost:8000" };
// app.use(cors(corsOptions));
app.use(cors());

// postgres db Connection
const { 
    database,
    username,
    password,
    host,
    dialect
 } = require("./database/config/config.json").development;
const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect,
    }
);

// setting up express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// setting up bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// express router middleware
app.use("/signup", routerSignup);
app.use("/login", routerLogin);
app.use("/barang", routerBarang);
app.use("/logout", routerLogout);
app.use("/akun", routerAkun);

const start = async () => {
    try {
        await sequelize.sync({ force: true });

        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        
        await app.listen(port, () => {
            console.log(`server is listening on http://localhost:${port}`);
        });
    }
    catch (err) {
        console.log(`failed to connect to database\n\n` + err);
    }
};

start();