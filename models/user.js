//Require Mongoose
var mongoose = require('mongoose');
var bcrypt = require("bcrypt-nodejs")

//Define a schema
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    local: {
        email: String,
        password: String,
        //Used to link an account to a player/referee/coach stats
        statLink: {
            linkType: String,
            linkId: Schema.Types.ObjectId
        },
        adminLevel: Number
    },
    facebook: {
        id: String,
        token: String,
        name: String,
        email: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }


});

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', UserSchema);
