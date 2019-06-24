
var api = {};

api.index = function(req, res) {

    console.log("req.params", req.params);
    res.send("On index page");
};

module.exports = api;