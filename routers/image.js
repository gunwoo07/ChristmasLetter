// Import express framework
var express = require("express");
var router = express.Router();
// Import fs to read file
var fs = require("fs");
var imageList = ["gift", "mailbox", "error", "writing"];


// Start router
router.get("/:imageName", (req, res) => {
    let imageName = req.params.imageName;

    for (var i = 0; i < imageList.length; i++) {
        if (imageName == imageList[i]) {
            fs.readFile("./data/gift.png", function(err, data) {
                res.writeHead(200, { "Content-Type" : "text/html" });
                res.end(data);
                return;
            });
            return;
        }
    }
    return;
})


// Export module
module.exports = router;
