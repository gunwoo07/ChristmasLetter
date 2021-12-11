// Import express framework
var express = require("express");
var router = express.Router();
// Import fs to read files
var fs = require("fs");


// Start router
router.get("/", (req, res) => {
    res.render("login");
});

router.post("/check", (req, res) => {
    // Get code from user
    let code = req.body.code;
    // Set cookie
    res.cookie("code", code);
    // Set data.json path
    let dataPath = "./data/data.json";

    // Read data.json file
    fs.readFile(dataPath, "utf8", (err, jsonFile) => {
        // Error
        if (err) {
            return console.log(error);
        }

        // Parse json file
        let jsonData = JSON.parse(jsonFile);

        // Check user
        let users = jsonData.users;

        for (var i = 0; i < users.length; i++) {
            let user = users[i];

            // OK
            if (user.letter == "" && user.code == code) {
                console.log(`[-]${user.name}(${user.code}) accessed`);
                res.redirect("/write");
                return;
            }
        }

        res.redirect("/error");
        return;
    });
});


// Export module
module.exports = router;
