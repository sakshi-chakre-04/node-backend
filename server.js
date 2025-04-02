require("dotenv").config(); // Load environment variables
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const upload = require("express-fileupload");
const mongoose = require("mongoose");
const appRouter = require("./app/routes/app.routes");

const app = express();

// Middleware
app.use(upload());
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("dev"));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Initialize Routes
appRouter.initialize(app);

// CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, token");
  res.header("Access-Control-Max-Age", "10000");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Serve Static Files
app.use("/public", express.static(path.join(__dirname, "public")));

// Default Route
app.get("/", (req, res) => {
  res.send("Hello, World! Server is running 🚀");
});

// Start Server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("✅ Server is listening on port", PORT);
});

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => {
  console.error("❌ MongoDB Connection Error:", err);
  process.exit(1);
});

module.exports = app;
