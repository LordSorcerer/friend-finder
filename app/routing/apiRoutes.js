var path = require("path");
var friendList = require("../data/friends.js");

var apiRoutes = function(app) {
    //API
    // Get a list of all existing users: their names, image urls and survey answers
    app.get("/api/friendList", function(req, res) {
        res.json(friendList);
    });

   //Default catchall
    app.get("*", function(req, res) {
        res.send("404 - Page not found!");
    });

    app.post("/api/survey", function(req, res) {
        var newFriend = req.body;
        var bestFriend = {
            index: 0,
            //Set starting compatibility high for the comparison below
            compatibility: 500
        };
        console.log(newFriend.scores[0]);
        console.log(friendList);
        for (i = 0; i < friendList.length; i++) {
            var tempCompatibility = 0;
            for (j = 0; j < friendList[i].scores.length; j++) {
                tempCompatibility += Math.abs(parseInt(newFriend.scores[j]) - friendList[i].scores[j]);
                console.log(tempCompatibility);
            }
            if (tempCompatibility < bestFriend.compatibility) {
                bestFriend.index = i;
                bestFriend.compatibility = tempCompatibility;
            }
        }
      
        friendList.push(req.body);
        console.log(friendList[bestFriend.index]);
        //Send the correct match back to the user
        res.json(friendList[bestFriend.index])

    });


};

module.exports = apiRoutes;