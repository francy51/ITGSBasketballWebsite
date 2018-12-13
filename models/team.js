//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: String,
    staff: [Schema.Types.Mixed],
    players: [Schema.Types.Mixed],
    //URL to the logo
    logo: String,
    games: [Schema.Types.Mixed]

});

module.exports = mongoose.model('Team', TeamSchema);
