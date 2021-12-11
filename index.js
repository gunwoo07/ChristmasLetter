// Import express framework
const express = require("express");
const app = express();
// Import middleware
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const favicon = require("serve-favicon");
// Import routers
const loginRouter = require("./routers/login");
const letterRouter = require("./routers/letter");
const errorRouter = require("./routers/error");
const finishRouter = require("./routers/finish");
const imageRouter = require("./routers/image");
// Set listening port as 3000
const port = 3000;


// Set rendering engine as an ejs
app.set("view engine", "ejs");
// Set ejs folder as views/
app.set("views", "./views");
// Set middleware as bodyParser, cookieParser, serve-favicon
app.use(bodyParser());
app.use(cookieParser());
app.use(favicon("./favicon.ico"));
// Use routers
app.use("/login", loginRouter);
app.use("/letter", letterRouter);
app.use("/error", errorRouter);
app.use("/finish", finishRouter);
app.use("/image", imageRouter);


app.get("/", (req, res) => {
    res.send("Hello~ It's working!");
});


// Start listening
app.listen(port, () => {
    console.log(`Christmas Letter(1.0) is running on port ${port}`);
});
