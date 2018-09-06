var express = require("express");
var app = express();
var mongoose = require("mongoose");
var Flower = require("./models/flower");
var seed = require("./seed");
var passport = require("passport");
var expressSession = require("express-session");
var localStrategy = require("passport-local");
var User = require("./models/user");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");


var blogRoutes = require("./routes/blog");
var userRoutes = require("./routes/user");
var indexRoutes = require("./routes/index");

// init DB
mongoose.connect(process.env.BLOOMTOWN_DB);
seed();

app.use(expressSession({
	secret: "hello world",
	resave: false,
	saveInitialized: false
}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new localStrategy(User.authenticate()));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});


// ROUTES
app.use("/posts", blogRoutes);
app.use(userRoutes);
app.use(indexRoutes);


app.listen(process.env.PORT || 3000, process.env.IP, function() {
	console.log("Flower shop up and running");
});