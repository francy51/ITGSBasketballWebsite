//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var StaffSchema = new Schema({
    firstName: String,
    lastName: String,
    nationality: String,
    birthday: Date,
    role: String,
    //put an object with team id + season 
    teams: [Schema.Types.Mixed]
});

module.exports = mongoose.model('Staff', StaffSchema);
