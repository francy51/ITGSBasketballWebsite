var express = require('express');
var router = express.Router();
var game = require("../models/game")
var player = require("../models/player")
var staff = require("../models/staff")
var team = require("../models/team")
var game = require("../models/game")


//THis is where all the admin routes are eg. creating a player, creating a fixture etc.




//TODO: check the body, fix birthday field
router.post('/newplayer', function(req, res, next) {

    let newPlayer = new player();


    newPlayer.firstName = req.body.firstName;
    newPlayer.lastName = req.body.lastName;
    newPlayer.height = req.body.height; //In CM
    newPlayer.nationality = req.body.nationality;
    newPlayer.birthday = req.body.birthday;

    let success = true;
    let msg = "";
    newPlayer.save(function(err) {
        if (err) {
            success = false;
            msg = err;
            console.error(err)
        }
        res.json({
            success: success,
            msg: msg
        })
    })

});

router.post('/newStaff', function(req, res, next) {

    let newStaff = new staff();

    newStaff.firstName = req.body.firstName;
    newStaff.lastName = req.body.lastName;
    newStaff.nationality = req.body.nationality;
    newStaff.birthday = req.body.birthday;
    newStaff.role = req.body.role;
    newStaff.teams = []


    let success = true;
    let msg = "";
    newStaff.save(function(err) {
        if (err) {
            success = false;
            msg = err;
            console.error(err)
        }
        res.json({
            success: success,
            msg: msg
        })
    })

});

router.post('/upload', function(req, res) {
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send('No files were uploaded.');
    }

    console.log(req.files)

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let image = req.files.file;
    // Use the mv() method to place the file somewhere on your server
    image.mv('./public/uploads/' + image.name, function(err) {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ success: true, msg: "image uploaded", fileName: image.name });
    });
});

router.post('/newTeam', function(req, res, next) {

    console.log(req.body)
    let newTeam = new team();

    let players = []
    let staff = []

    newTeam.name = req.body.name

    for (let i = 0; i < req.body.players.length; i++) {
        players.push({ id: req.body.players[i]._id, firstName: req.body.players[i].firstName, lastName: req.body.players[i].lastName })
    }

    for (let i = 0; i < req.body.staff.length; i++) {
        staff.push({ id: req.body.players[i]._id, firstName: req.body.players[i].firstName, lastName: req.body.players[i].lastName, role: req.body.players[i].role })
    }

    newTeam.players = players
    newTeam.staff = staff
    //the file name * not path because this changes depending which file tries to access the logo *
    newTeam.logo = req.body.logo


    //   name: String,
    // staff: [Schema.Types.Mixed],
    // players: [Schema.Types.Mixed],
    // //namn of the logo
    // logoPath: String,
    // games: [Schema.Types.Mixed]

    let success = true;
    let msg = "";
    newTeam.save(function(err) {
        if (err) {
            success = false;
            msg = err;
            console.error(err)
        }
        res.json({
            success: success,
            msg: msg
        })
    })

});

router.post('/newGame', function(req, res, next) {
    console.log(req.body);

    let newGame = new game();

    newGame.time = req.body.time;
    newGame.date = req.body.date;
    newGame.isPlayed = req.body.isPlayed;
    newGame.referees = req.body.referees;
    newGame.home = req.body.home;
    newGame.away = req.body.away;

    let success = true;
    let msg = "";
    newGame.save(function(err) {
        if (err) {
            success = false;
            msg = err;
            console.error(err)
        }
        res.json({
            success: success,
            msg: msg
        })
    })

})

module.exports = router;
