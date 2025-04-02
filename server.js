const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
// cons methodOverride = require('method-override');

const config = require("./config/config");
const upload = require("express-fileupload");
const mongoose = require("mongoose");
const appRouter = require("./app/routes/app.routes");

const app = express();

// Configure method-override before body parsers
// app.use(methodOverride(function (req, res) {
//   if (req.body && typeof req.body === 'object' && '_method' in req.body) {
//     // look in urlencoded POST bodies and delete it
//     var method = req.body._method;
//     delete req.body._method;
//     return method;
//   }
// }));

app.use(upload());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors());
app.use(morgan("dev"));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Initialize routes
appRouter.initialize(app);

// Request Middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, token"
  );
  res.header("Access-Control-Max-Age", "10000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/public", express.static(path.join(__dirname, "public")));

// Start the server
app.listen(config.serverPort, () => {
  console.log("Server is listening on port ", config.serverPort);
});

// Configuring the database
mongoose.Promise = global.Promise;
mongoose
  .connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("Successfully connected to the database:", config.dbUrl);
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

module.exports = app;
