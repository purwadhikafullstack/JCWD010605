// import express from "express";
// const app = express();

// app.listen(8000, ()=> console.log('server running at port 8000'));



require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(
  cors()
  // cors({
  //   origin: [
  //     process.env.WHITELISTED_DOMAIN &&
  //       process.env.WHITELISTED_DOMAIN.split(","),
  //   ],
  // })
);

app.use(express.json());

//#region API ROUTES
const { authRoute } = require('./routes');

const db = require('./models');
db.sequelize.sync({ alter: true });

app.use('/auth', authRoute);

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

// app.post("/register", (req, res) => {
//   const user = req.body;

//   connection.query('INSERT INTO users SET ?', user, (error, results, fields) => {
//     if (error) throw error;
//     console.log('User added to the database!');
//     res.send('User added to the database!');
//   });
// });

// app.get('/users2', (req, res) => {
//   connection.query('SELECT * FROM users', (error, results, fields) => {
//     if (error) throw error;
//     res.send(results);
//   });
// });

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
