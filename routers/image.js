// Import express framework
var express = require("express");
var router = express.Router();
// Import fs to read file
var fs = require("fs");


// Start router
router.get("/gift", (req, res) => {
    fs.readFile("./data/gift.png", function(err, data) {
        res.writeHead(200, { "Content-Type" : "text/html" });
        res.end(data);
    });
});


router.get("/mailbox", (req, res) => {
    fs.readFile("./data/mailbox.png", function(err, data) {
        res.writeHead(200, { "Content-Type" : "text/html" });
        res.end(data);
    });
});


router.get("/writing", (req, res) => {
    fs.readFile("./data/writing.png", function(err, data) {
        res.writeHead(200, { "Content-Type" : "text/html" });
        res.end(data);
    });
});


router.get("/error", (req, res) => {
    fs.readFile("./data/error.png", function(err, data) {
        res.writeHead(200, { "Content-Type" : "text/html" });
        res.end(data);
    });
});

// Export module
module.exports = router;
