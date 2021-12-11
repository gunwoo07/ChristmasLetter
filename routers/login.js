// Import express framework
var express = require("express");
var router = express.Router();


// Start router
router.get("/", (req, res) => {
    res.send("welcome to login page");
});


// export module
module.exports = router;
