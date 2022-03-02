const mongoose = require("mongoose");
const crypto = require("crypto");
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        required: true,
    },
    entrypted_password: {
        type: String,
    },
    salt: {
        type: String,
    },
});

UserSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = "deeep";
        this.entrypted_password = this.securePassword(this._password);
        console.log("set pass");
    })
    .get(function () {
        console.log("get");
    });

UserSchema.method({
    securePassword: function (plainPasssword) {
        return crypto
            .createHmac("sha256", this.salt)
            .update(plainPasssword)
            .digest("hex");
    },
    authenticate: function (userPassword) {
        return this.entrypted_password == this.securePassword(userPassword);
    },
});

module.exports = mongoose.model("User", UserSchema);
