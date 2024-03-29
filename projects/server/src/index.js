const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const schedule = require("node-schedule");
const { checkTransactions } = require("./controllers/checker");

schedule.scheduleJob("*/5 * * * *", checkTransactions);

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors()
  // cors({
  //   origin: [process.env.WHITELISTED_DOMAIN && process.env.WHITELISTED_DOMAIN.split(',')],
  // })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//#region API ROUTES
const { authRoute, propertysRoute, categoriesRoute } = require("./routes");

const db = require("./models");
db.sequelize.sync({ alter: true });

app.use("/api/auth", authRoute);
app.use("/api/propertys", propertysRoute);
app.use("/api/categories", categoriesRoute);

// db.sequelize.sync({ alter: true });

app.use(
  "/api/payment_proof",
  express.static(`${__dirname}/public/PaymentProof/`)
);
// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
