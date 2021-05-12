const express = require("express");

const app = express();
const port = 3000;
const authRouter = express.Router();
const authRouterNew = express.Router();
const users = ["John", "Mark"];
const products =["keyboard","mouse"];
app.use(express.json());

const logUsers = (req, res, next) => {
  console.log(users);
  next();
};

app.use(logUsers);

const logMethod = (req, res, next) => {
  console.log(req.method);
  next();
};

app.get("/users", logMethod, (req, res, next) => {
  if (users.length === 0) {
    const err = new Error("no users");
    err.status = 500;
    next(err);
  }
  res.json(users);
});

app.get("*", (req, res, next) => {
    const err = new Error("NOT FOUND");
    err.status = 404;
    next(err);
});

authRouter.get("/users", (req, res, next) => {
  res.json(users);
  next();
});

authRouterNew.get("/products/update", (req, res, next) => {
    res.json(users);
    next();
});

authRouterNew.post("/products", (req, res, next) => {
    const product = req.body.prod;
    products.splice(0, 1, product);
    res.json(products);
});

authRouter.post("/users/create", logMethod, (req, res, next) => {
    users.push(req.body.name);
    res.json(users);
});

authRouterNew.use((req, res, next) => {
    console.log("products router");
});

app.use((err, req, res, next) => {
  // set the status code
  res.status(err.status);
  // send the response in JSON format
  res.json({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});


app.use(authRouter);
app.use(authRouterNew);


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
