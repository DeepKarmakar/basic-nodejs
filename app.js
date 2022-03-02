const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/Aliance";
const http = require("http");
const user = require("./routers/user");

const app = express();

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", function () {
    console.log("connect successfull");
});

app.use(express.json());

// routers
const alliancdRouter = require("./routers/alience");
app.use("/aliens", alliancdRouter);
app.use("/user", user);
app.use("/", (req, res) => {
    res.send("hello");
});

app.listen(9000, () => {
    console.log("9000 running");
});
