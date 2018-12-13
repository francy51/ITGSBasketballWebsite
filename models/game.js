//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    date: Date,
    time: String, //In minutes
    isPlayed: Boolean,
    location: { lng: Number, lat: Number }, //Longitude and latitude of their location
    referees: [Schema.Types.Mixed],
    home: {
        _id: String,
        logo: String,
        name: String,
        id: String,
        score: Number,
        staff: [Schema.Types.Mixed],
        players: [Schema.Types.Mixed]
    },
    away: {
        _id: String,
        logo: String,
        name: String,
        id: String,
        score: Number,
        staff: [Schema.Types.Mixed],
        players: [Schema.Types.Mixed]
    }
});

module.exports = mongoose.model('Game', GameSchema);
