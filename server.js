const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const bodyParser= require('body-parser');
const path =require('path');

const connectDB=require('./server/database/connection');
// after morgan connectDB()


const app = express();
dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 8080;

app.use(morgan("tiny"))

// mongo connection
connectDB();

app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine","ejs");
// app.set("views",path.resolve(__dirname,"views/ejs"))

// load assets
app.use("/css",express.static(path.resolve(__dirname,"assets/css")))
app.use("/js",express.static(path.resolve(__dirname,"assets/js")))
app.use("/img",express.static(path.resolve(__dirname,"assets/img")))

// Load Routers
app.use("/",require('./server/routes/router.js'))


app.listen(PORT, () => {
  console.log(`server is running on https://localhost: ${PORT}`);
});
