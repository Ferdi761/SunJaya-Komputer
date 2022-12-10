const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const Sequelize = require("sequelize");
const { Server } = require('socket.io');
const port = process.env.PORT || 8000;

const { ChatSocketController } = require("./controllers/ChatSocketController");

const socketIO = new Server(server, {
    cors: {
        origin: "*"
    }
});
const chatSocketController = new ChatSocketController(socketIO);

// middleware
app.use(cookieParser());

// setting up express router
const routerSignup = require("./routes/routeSignup");
const routerLogin = require("./routes/routeLogin");
const routerBarang = require("./routes/routeBarang");
const routerLogout = require("./routes/routeLogout");
const routerJenisBarang = require("./routes/routeJenisBarang");
const routerRekening = require("./routes/routeRekening");
const routerKeranjang = require("./routes/routeKeranjang");
const routerPemesanan = require("./routes/routePemesanan");
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
    { host, dialect }
);

app.use(express.json());
// setting up express middleware
app.use(express.urlencoded({ extended: true }));

// setting up bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// express router middleware
app.use("/api/signup/", routerSignup);
app.use("/api/login/", routerLogin);
app.use("/api/barang/", routerBarang);
app.use("/api/logout/", routerLogout);
app.use("/api/akun/", routerAkun);
app.use("/api/jenis/", routerJenisBarang);
app.use("/api/rekening/", routerRekening);
app.use("/api/keranjang/", routerKeranjang);
app.use("/api/pemesanan/", routerPemesanan);

const start = async () => {
    try {
        await sequelize.sync({ force: true });
        await sequelize.sync({alter: true});

        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
        
        await server.listen(port, () => {
            console.log(`server is listening on http://localhost:${port}`);
        });
    }
    catch (err) {
        console.log(`failed to connect to database\n\n` + err);
    }
};

start();