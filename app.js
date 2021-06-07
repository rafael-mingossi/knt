const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

//require the library dotenv for the environment variables
require("dotenv/config");
//require("dotenv").config();

//Auth
const authJwt = require("./helpers/jwt"); //secure the server based on token
const errorHandler = require("./helpers/error-handler");

//HTTP options, requests/communication options for a given URL or server
app.use(cors());
app.options("*", cors);

//Middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(authJwt());
app.use(errorHandler);

//Routes
const usersRoutes = require("./routes/users");
const apiRoutes = require("./routes/extapis");

//create a const to use the variable from .env file
const api = process.env.API_URL;

//Endpoints
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/extapis`, apiRoutes);

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
