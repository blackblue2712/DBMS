
// express
const express = require("express");
const app = express();

// port
const PORT = process.env.PORT || 8080;

//
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require('dotenv').config()

// database
const mysql = require('mysql');
con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "liars-ask"
});
  
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

// Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const askRoute = require("./routes/asks");
const blogRoute = require("./routes/blogs");
const tagRoute = require("./routes/tags");
const AnnouncementRoute = require("./routes/announcements");
const voteRoute = require("./routes/votes");
// const galleryRoute = require("./routes/galleries");


// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
// use routes

app.use("/users", userRoute);
app.use("/auth", authRoute);
app.use("/asks", askRoute);
app.use("/blogs", blogRoute);
app.use("/tags", tagRoute);
app.use("/announcements", AnnouncementRoute);
app.use("/votes", voteRoute);

// app.use("/galleries", galleryRoute);



app.use( function(error, req, res, next) {
    if(error.name === "UnauthorizedError") {
        return res.status(403).json( {message: error.message} );
    }
    next();
})

// 404 handling - put it in very bottom because express will exucute all middlewares and functions, so if 404 this middleware will be run
app.use(function (req, res, next) {
    res.status(404).send({error: "404 not found!"});
});

// Listen port
app.listen(PORT, () => {
    console.log(`Liars-ask react listen on port ${PORT}`);
})
