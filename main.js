const express = require("express");

const app = express();
const port = 3000;

const users = ["John", "Mark"];
app.use(express.static("public"));
app.use(express.json());

const logUsers  = (req, res, next) => {
    console.log(users);
    next();
};

app.use(logUsers);

const logMethod = (req, res, next)=>{
    console.log(req.method);
    next();
}

app.get("/users", logMethod, (req, res, next) => {
    res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});