
var middleware = {
	isAuthenticated: function (req, res, next) {
						if(req.isAuthenticated()) {
							next();
						} else {
							res.redirect("/login");
						}
					}
}

module.exports = middleware;