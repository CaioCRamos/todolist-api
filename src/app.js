const express = require("express");
const mongoose = require("mongoose");
const config = require("./config");

const app = express();

app.use(express.json({
    limit: "10mb"
}));

mongoose.connect(config.connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Habilita o CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

//Load routes
const indexRoute = require("./routes/index-route");
const todosRoute = require("./routes/todo-route");
const usersRoute = require("./routes/user-route");

app.use("/v1", indexRoute);
app.use("/v1/todos", todosRoute);
app.use("/v1/users", usersRoute);

module.exports = app;