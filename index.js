const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const config = require("config");
const express = require("express");
const app = express();
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR:jwtPrivateKey is not defined");
  process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
