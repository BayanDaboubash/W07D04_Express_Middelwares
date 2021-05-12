const express = require("express");

const app = express();
const port = 3000;
const authRouter = express.Router();
const authRouterNew = express.Router();
const users = ["John", "Mark"];
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
    // pass it to next, we only pass values to `next` when we want to call the error handling middleware
    next(err);
  }
  res.json(users);
});

authRouter.get("/users", (req, res, next) => {
  res.json(users);
  next();
});

authRouterNew.get("/products", (req, res, next) => {
    res.json(users);
    next();
});

authRouter.post("/users/create", logMethod, (req, res, next) => {
    users.push(req.body.name);
    res.json(users);
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
