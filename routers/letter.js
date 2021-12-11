// Import express framework
const { json } = require("body-parser");
var express = require("express");
var router = express.Router();
// Import fs to read files
var fs = require("fs");


// Start router
router.get("/", (req, res) => {
    // Read code cookie
    let code = req.cookies.code;
    // Set data.json path
    let dataPath = "./data/data.json";

    // code is empty
    if (code == undefined) {
        res.redirect("/error");
    }

    // Read data.json file
    fs.readFile(dataPath, "utf8", (err, jsonFile) => {
        // Error
        if (err) {
            return console.log(err);
        }

        // Parse json file
        let jsonData = JSON.parse(jsonFile);
        
        // Check user
        let users = jsonData.users;

        for (var i = 0; i < users.length; i++) {
            let user = users[i];

            // OK
            if (user.code == code) {
                res.render("write", {letter: user.letter});
                return;
            }
        }

        res.redirect("/error");
        return;
    });
});


router.post("/write", (req, res) => {
    // Read letter, code
    let letter = req.body.letter;
    let code = req.cookies.code;
    // Set data.json path
    let dataPath = "./data/data.json";


    // Code is empty
    if (code == undefined) {
        res.redirect("/error");
        return;
    }

    // Read data.json file
    fs.readFile(dataPath, "utf8", (err, jsonFile) => {
        // Error
        if (err) {
            return console.log(err);
        }

        // Parse json file
        let jsonData = JSON.parse(jsonFile);
        
        // Check user
        let users = jsonData.users;

        for (var i = 0; i < users.length; i++) {
            let user = users[i];

            // OK
            if (user.code == code) {
                // Change letter
                jsonData.users[i].letter = letter;
                newJsonFile = JSON.stringify(jsonData, null, 4);
                fs.writeFile(dataPath, newJsonFile, 'utf8', () => {
                    console.log(`[!]${user.name}(${user.code}) updated letter`);
                    res.redirect("/finish");
                });
                return;
            }
        }

        res.redirect("/error");
        return;
    });

});


// Export module
module.exports = router;
