const mongoDBUrl = 'mongodb://127.0.0.1:27017/inventory';

// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Import Mongoose
let mongoose = require("mongoose");
// Initialize the app
let app = express();
// Import cors
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(cors());
app.options("*", cors());
app.use(cookieParser());

// Import routes
let api = require("./api");

// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

// Use Api routes in the App
app.use("/api", api);

// Connect to Mongoose and set connection variable
mongoose.connect(mongoDBUrl, { useNewUrlParser: true }).then((db) => {
  // Added check for DB connection
  if (!db) console.log("Error connecting to mongoDB");
  else console.log("mongoDB connected successfully");

  // Setup server port
  var port = process.env.PORT || 8080;
  // Send message for default URL
  app.get("/", (req, res) => res.send("Hello World with Express"));
  // Launch app to listen to specified port
  app.listen(port, function () {
    console.log("Running Inventory System Backend on port " + port);
  });
});
var db = mongoose.connection;
