//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
    firstName: String,
    lastName: String,
    height: Number, //In CM
    nationality: String,
    birthday: Date
});

module.exports = mongoose.model('Player', PlayerSchema);
