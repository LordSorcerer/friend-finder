var path = require("path");
var friendList = require("../data/friends.js");

var apiRoutes = function(app) {
//HTML
    // Basic route that sends the user to our home page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    //Route that sends user to the survey page 
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

//API
    // Get a list of all existing users: their names, image urls and survey answers
    app.get("/api/friendList", function(req, res) {
        res.json(friendList);
    });

    app.post("/api/survey", function(req, res) {
        friendList.push(req.body);
        console.log(friendList);
    });

//Default catchall
    app.get("*", function(req, res) {
        res.send("404 - Page not found!");
    });
};

module.exports = apiRoutes;