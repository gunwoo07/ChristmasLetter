// Import express framework
var express = require("express");
var router = express.Router();
// Import nodemailer
var nodemailer = require("nodemailer");
// Import fs to read files
var fs = require("fs");

// Set data.json path
var dataPath = "./data/data.json";
var email = "";
var pass = "";
var transporter = "";


// Read data.json file
fs.readFile(dataPath, "utf8", (err, jsonFile) => {
    // Error
    if (err) {
        return console.log(err);
    }

    // Parse json file
    let jsonData = JSON.parse(jsonFile);
    email = jsonData.email.email;
    pass = jsonData.email.pass;

    transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: email,
            pass: pass
        }
    });
});


// Send Email
var sendMail = async (stdntId, letter) => {
    await transporter.sendMail({
        from: "장승 편지",
        to: `21s${stdntId}@jangseung.sen.ms.kr`,
        subject: "당신에게 편지가 도착했습니다!",
        text: letter,
        html: `<b>${letter.replace(/\n/gi, '<br>')}</b>`
    });
}


// Start router
router.get("/", (req, res) => {
    // Read code cookie
    let code = req.cookies.code;


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
                console.log(`[=]${user.name}(${user.code}) accessed`);
                res.render("letter");
                return;
            }
        }

        res.redirect("/error");
        return;
    });
});


router.post("/send", (req, res) => {
    // Read letter, code, stdntId
    let letter = req.body.letter;
    let code = req.cookies.code;
    let stdntId = req.body.stdntId;


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
                // appendLetter
                jsonData.users[i].letters.push(
                    {
                        receiver: String(stdntId),
                        content: letter
                    }
                );
                newJsonFile = JSON.stringify(jsonData, null, 4);
                fs.writeFile(dataPath, newJsonFile, 'utf8', () => {
                    console.log(`[!]${user.name}(${user.code}) sent letter to ${stdntId}`);
                    sendMail(stdntId, letter);
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
