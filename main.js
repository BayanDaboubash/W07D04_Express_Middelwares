const express = require("express");

const app = express();
const port = 3000;

const users = ["John", "Mark"];
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
    if(users.length ===0){
        const err = new Error("no users");
  err.status = 500;
  // pass it to next, we only pass values to `next` when we want to call the error handling middleware
  next(err);
    }
    res.json(users);
});

app.get("/users", (req, res, next) => {
    res.json(users);
    next();
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


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});