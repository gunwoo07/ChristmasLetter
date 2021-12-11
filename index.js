// Import express framework
const express = require("express");
const app = express();

// Set listening port as 3000
const port = 3000;


app.get("/", (req, res) => {
    res.send("Hello~ It's working!");
});


// Start listening
app.listen(port, () => {
    console.log(`Christmas Letter(1.0) is running on port ${port}`);
});
