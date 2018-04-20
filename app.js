//requiring packages

var paymentRouter = require("./routes/index/paymentroutes");
const express = require("express");
var app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin/adminRoute");
const configuration = require("./db/config");
//parsing middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


//auth packages
const session = require("express-session");
const passport = require("passport");
var flash = require('connect-flash');
var MongoDBStore = require('connect-mongodb-session')(session);

//routes
app.use(express.static("./public"));
//making sessions collection
var store = new MongoDBStore(
  {
    uri: configuration.dburl,
    collection: 'mySessions'
  });
// Catch errors
store.on('error', function (error) {
  assert.ifError(error);
  assert.ok(false);
});

app.use(session({
  secret: 'thisisarandomstringforhashingpasswords',
  resave: false,
  store: store,
  saveUninitialized: false
  //cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use('/', adminRoutes);
app.use("/payment", paymentRouter);

// app.listen(3000,()=>{
app.listen(process.env.PORT || configuration.port, () => {
  console.log("Application started");
});




// Initialize Application with default entries in db
const initApplication = require('./helper/commonhelper/initApplication/initApplicationHelper');
initApplication();

//next 2 lines to be commented after project completion.
// const findCompanyDetails = require('./helper/commonhelper/companydetails/fetchcompanydetails');
// findCompanyDetails();
//const fetchMenu = require('./helper/commonhelper/fetchMenuHelper/fetchMenu');
//fetchMenu();