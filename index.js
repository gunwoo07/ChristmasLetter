// Import express framework
const express = require("express");
const app = express();
// Import middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// Import routers
const loginRouter = require("./routers/login");
// Set listening port as 3000
const port = 3000;


// Set rendering engine as an ejs
app.set("view engine", "ejs");
// Set ejs folder as views/
app.set("views", "./views");
// Set middleware as bodyParser, cookieParser
app.use(bodyParser());
app.use(cookieParser());
// Use routers
app.use("/login", loginRouter);


app.get("/", (req, res) => {
    res.send("Hello~ It's working!");
});


// Start listening
app.listen(port, () => {
    console.log(`Christmas Letter(1.0) is running on port ${port}`);
});
