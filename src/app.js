const express = require("express");
const path = require("path");
const hbs = require("hbs");
const utils = require("./utils/forecast");
const weatherCheck = require("./utils/forecast");
const forecast = require("./utils/forecast");
const app = express();
const port = process.env.PORT || 3000;

// Define Path
const publicDirectory = path.join(__dirname, "../public");
const viewDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

// Setup hbs template
app.set("view engine", "hbs");
app.set("views", viewDirectory);
hbs.registerPartials(partialsDirectory);

// Define public folder
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "index Template",
    name: "Atakan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about Template",
    name: "Atakan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide a address",
    });
  }
  
  forecast(req.query.address, (error, location, temperature) => {
    var msg = "";
    if (location) {
      msg = "Current temperature in " + location + " is " + temperature + "℃";
    }
    return res.render("weather", {
      title: "Weather Template",
      name: msg,
    });
  });
});

app.get("*", (req, res) => {
  res.send("Page Not Found 404!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
