const express = require("express");
const router = express.Router();
const Alien = require("../models/alien");

router.get("/", async (req, res) => {
    try {
        const aliens = await Alien.find();
        res.json(aliens);
    } catch (err) {
        res.send("golmal hain");
    }
});

router.get("/:id", async (req, res) => {
    const getId = req.params.id;
    try {
        const getAlien = await Alien.findById(getId);

        res.send(getAlien);
    } catch (err) {
        res.send(err);
    }
});

router.post("/", async (req, res) => {
    const alianObj = new Alien({
        name: req.body.name,
        age: req.body.age,
        subscribed: req.body.subscribed,
    });
    try {
        const userObj = await alianObj.save();
        res.json(userObj);
    } catch (err) {
        res.send(err);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const getAlian = await Alien.findById(req.params.id);
        getAlian.subscribed = req.body.subscribed;

        const saveData = await getAlian.save(getAlian);
        res.send(saveData);
    } catch (err) {
        res.send(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const ali = await Alien.findById(req.params.id);
        const removedAli = await ali.remove();
        res.send(removedAli);
    } catch (err) {
        res.send("no deleted");
    }
});

module.exports = router;
