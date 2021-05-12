const express = require("express");

const app = express();
const port = 3000;

const users = ["John", "Mark"];
app.use(express.static("public"));
app.use(express.json());

app.get("/users", (req, res, next) => {
  res.json(users);
});

const logUsers  = (req, res, next) => {
    console.log(users);
    next();
};

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});