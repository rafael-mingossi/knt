const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

//require the library dotenv for the environment variables
require("dotenv/config");

//Auth
//TODO

//HTTP options, requests/communication options for a given URL or server
app.use(cors());
app.options("*", cors);

//Middlewares
app.use(express.json());
app.use(morgan("tiny"));

//Routes
const usersRoutes = require("./routes/users");
const apiRoutes = require("./routes/extapi");

//create a const to use the variable from .env file
const api = process.env.API_URL;

//Endpoints
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/extapi`, apiRoutes);

//Mongo connection
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "knt",
    useFindAndModify: false,
  })
  .then(() => {
    console.log("DB Connection is ready");
  })
  .catch((err) => {
    console.error(err);
  });

//Development
app.listen(3000, () => {
  console.log("server is running http://localhost:3000");
});
