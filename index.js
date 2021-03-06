// Import express
let express = require("express");
// Import Body parser
let bodyParser = require("body-parser");
// Import Cors
let cors = require("cors");
// Import Mongoose
let mongoose = require("mongoose");
// Initialize the app
let app = express();

// Import routes
let apiRoutes = require("./api-routes");
app.use(cors());
// Configure bodyparser to handle post requests
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
// Connect to Mongoose and set connection variable
var database_url =
  process.env.DATABASE_URL || "mongodb://localhost:27017/restaurants";
mongoose.connect(database_url, { useNewUrlParser: true });

var db = mongoose.connection;

// Added check for DB connection

if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");

// Setup server port
var port = process.env.PORT || 8080;

// Send message for default URL
app.get("/", (req, res) => res.send("Hello World with Express"));

// Use Api routes in the App
app.use("/api", apiRoutes);
// Launch app to listen to specified port
app.use(express.static(__dirname + "/public"));

app.listen(port, function() {
  console.log("Running Server on port " + port);
});
