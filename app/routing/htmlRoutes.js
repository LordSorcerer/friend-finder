var path = require("path");

var htmlRoutes = function(app) {
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

};

module.exports = htmlRoutes;


