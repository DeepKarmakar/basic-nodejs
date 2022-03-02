const mongo = require("mongoose");

const AlienSchma = new mongo.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    subscribed: {
        type: Boolean,
        required: true,
        default: false,
    },
});

module.exports = mongo.model("Alian", AlienSchma);
