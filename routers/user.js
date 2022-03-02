const { json } = require("express");
const express = require("express");
const User = require("../models/user");
var jwt = require("jsonwebtoken");
var expressjwt = require("express-jwt");

const router = express.Router();

const protectedRoute = expressjwt({
    secret: "shhhhh",
    algorithms: ["HS256"],
});

router.get("/", protectedRoute, (req, res) => {
    User.find((err, data) => {
        if (err) {
            res.json({ data: err });
        } else {
            res.json({ data: data });
        }
    });
});

router.post("/registrtion", (req, res) => {
    const userObj = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    // const insertDb = userObj.save();
    userObj.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: err.message,
            });
        }
        res.json({
            user: user,
        });
    });
});

router.post("/login", (req, res) => {
    const getEmail = req.body.email;
    const userPass = req.body.password;

    User.findOne(
        {
            email: getEmail,
        },
        (err, data) => {
            console.log(err);
            if (err) {
            } else {
                if (data) {
                    // res.json(data);
                    if (data.authenticate(userPass)) {
                        res.json({
                            data: data,
                            token: jwt.sign({ foo: "bar" }, "shhhhh"),
                        });
                    } else {
                        res.send("bad pass");
                    }
                } else {
                    res.json({
                        data: "Wrong credentials",
                    });
                }
            }
        }
    );
});

module.exports = router;
