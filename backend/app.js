const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Import
const csv = require("./Routes/csvRoute");

app.use("/api/v1", csv);

app.use(express.static(path.resolve(__dirname, "public")));

module.exports = app;
