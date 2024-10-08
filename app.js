const express = require("express");
const app = express();
const registerRouter = require("./src/router.js");
const port = process.env.PORT || 4000;
const path = require("path");
app.use(registerRouter);
require("dotenv").config();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "Client", "build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "Client", "build", "index.html"));
  });
}

app.listen(port, (res, req) => {
  console.log("I am running on port " + port);
});
