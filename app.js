const express = require("express");
const hbs = require("hbs")
const path = require("path");
const flash = require('connect-flash');
const session  = require("express-session");
const passport = require("passport");
const cookieParser = require("cookie-parser");

hbs.registerPartials(__dirname+"/views/_partials")

require("./config/passport")(passport);
// initialization
require("./config/connection")
const app = express();

app.set("views",path.join(__dirname,"views"));
app.set("view engine","hbs");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));

//
app.use(cookieParser());

// express session
app.use(session({
   secret:"secret",
   resave:true,
   saveUninitialized:true
})
);

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
   res.locals.user = req.user || null;
   next();
 });

// Global variables
app.use(function(req, res, next) {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('error_msg');
   res.locals.error = req.flash('error');
   next();
});

// set routes
app.use((req,res,next)=>{
  global.Id = req.user ? req.user.id : null;
   next();
})
app.use("/",require("./routes/index"))
app.use("/account",require("./routes/user"));
app.use("/profile",require("./routes/profile"));
app.use("/friends",require("./routes/friend"));
app.use("/messenger",require("./routes/messenger"));
app.use("/messages",require("./routes/messagesApi"));

app.use("/friendsApi",require("./routes/friendsApi"));
app.use("/media",require("./routes/imageApi"));
app.use("/search",require("./routes/searchApi"));




const port = process.env.PORT || 5000
server = app.listen(port,(err)=>{
   console.log('\x1b[33m%s\x1b[0m',`server is running on ${port}`);
});
require("./socketServer")(server);
