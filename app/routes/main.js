module.exports = function(app) {
 
    app.route('/')
        .get(function(req, res) {
		  res.send('It\'s Running!');
		});

};