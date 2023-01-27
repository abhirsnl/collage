const express = require("express");
const app = express();
require("dotenv").config();
const { port } = require("./config/config");
const morgan = require("morgan");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require("helmet");
const bodyParser = require("body-parser");
const fileUpload = require ('express-fileupload')
const { sendMail } = require("./src/v1/helper/nodemailer")
require('./config/database');

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({ limit: "50mb" }));
app.set('view engine', 'ejs')
app.use(cookieParser());

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  }));

//options for cors middleware
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send(`<div align="center" style=""><h1> WELCOME IN Sample API. <h1><div>`)
})

//api routes permission
require('./src/v1/routes/routes')(app);

app.listen(port, async() => {
//   await sendMail("react.nodejs16@gmail.com",null,"API Testing","something happened")
    console.log("Server is running on PORT:", port);
})