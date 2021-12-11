// Import express framework
var express = require("express");
var router = express.Router();


// Start router
router.get("/", (req, res) => {
    res.render("finish");
});


// Export module
module.exports = router;
