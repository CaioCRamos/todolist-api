const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

app.use(express.json());

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

//Load routes
const indexRoute = require("./routes/index-route");
const todosRoute = require("./routes/todo-route");
const usersRoute = require("./routes/user-route");

app.use("/v1", indexRoute);
app.use("/v1/todos", todosRoute);
app.use("/v1/users", usersRoute);

module.exports = app;