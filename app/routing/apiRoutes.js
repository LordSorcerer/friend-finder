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
    //Default catchall
    app.get("*", function(req, res) {
        res.send("404 - Page not found!");
    });

    //API
    // Get a list of all existing users: their names, image urls and survey answers
    app.get("/api/friendList", function(req, res) {
        res.json(friendList);
    });

    app.post("/api/survey", function(req, res) {
        var newFriend = req.body;
        var bestFriend = {
            index: 0,
            compatibility: 0
        };
        console.log(friendList);
        for (i = 0; i < friendList.length; i++) {
            var tempCompatibility = 0;
            console.log("Length: " + friendList[i].scores.length);
            for (j = 0; j < friendList[i].scores.length; j++) {
                console.log(tempCompatibility);
            }
            if (tempCompatibility > bestFriend.compatibility) {
                bestFriend.index = i;
                bestFriend.compatibility = tempCompatibility;
            }
        }
        console.log()
        friendList.push(req.body);
    });


};

module.exports = apiRoutes;