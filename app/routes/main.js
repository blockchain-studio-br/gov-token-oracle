module.exports = function(app) {
 	
 	var api = app.api;

    app
    	.route('/')
    	.get(api.validator.index);

};