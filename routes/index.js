var express = require('express');
var router = express.Router();
var Game = require("../models/game");
var Player = require('../models/player');
var Staff = require("../models/staff")
var Team = require("../models/team")





//returns last 10 games played or njot played
router.get('/games/:page', function(req, res, next) {
    Game.find({}, null, { skip: (10 * (req.params.page - 1)), limit: 10 }, function(err, games) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }

        res.json({ success: true, msg: "succesfull", games: games })
    })
})

//returns the fixtures for that page
router.get('/fixtures/:page', function(req, res, next) {
    Game.find({ "isPlayed": false }, null, { skip: (10 * (req.params.page - 1)), limit: 10 }, function(err, games) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }

        res.json({ success: true, msg: "succesfull", games: games })
    })
})

//played games
router.get('/played/:page', function(req, res, next) {
    Game.find({ "isPlayed": true }, null, { skip: (10 * (req.params.page - 1)), limit: 10 }, function(err, games) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }

        res.json({ success: true, msg: "succesfull", games: games })
    })
});


//returns all the players
router.get('/players', function(req, res, next) {
    Player.find({}, function(err, players) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", players: players })
    })
})
//returns opnly 10 players
router.get('/players/:page', function(req, res, next) {
    Player.find({}, null, { skip: (10 * (req.params.page - 1)), limit: 10 }, function(err, players) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", players: players })
    })
})

router.get('/staff', function(req, res, next) {
    Staff.find({}, function(err, staff) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", staff: staff })
    })
})


router.get('/staff/:page', function(req, res, next) {
    Staff.find({}, null, { skip: (10 * (req.params.page - 1)), limit: 10 }, function(err, staff) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", staff: staff })
    })
})

router.get('/teams', function(req, res, next) {
    Team.find({}, function(err, staff) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", teams: staff })
    })
})


router.get('/referees', function(req, res, next) {
    Staff.find({ "role": "referee" }, function(err, staff) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", staff: staff })
    })
})


router.get('/teams/:page', function(req, res, next) {
    Team.find({}, null, { skip: (10 * (req.params.page - 1)), limit: 10 }, function(err, staff) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", teams: staff })
    })
})

router.get('/team/:id', function(req, res, next) {
    Team.findOne({ "_id": req.params.id }, function(err, team) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", team: team })
    })
})

router.get('/game/:id', function(req, res, next) {
    Game.findOne({ "_id": req.params.id }, function(err, game) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", game: game })
    })
})

router.get('/fixture/:id', function(req, res, next) {
    Game.findOne({ "_id": req.params.id, }, function(err, game) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        res.json({ success: true, msg: "succesfull", game: game })
    })
})


router.get('/player/:id', function(req, res, next) {
    Player.findOne({ "_id": req.params.id }, function(err, player) {
        if (err) {
            console.error(err)
            res.json({ success: false, msg: "error" })
        }
        console.log(player);
        res.json({ success: true, msg: "succesfull", player: player })
    })
})

//get the stats using a players id
router.get('/stats/:id', function(req, res, next) {
    Game.find({ $and: [{ isPlayed: true }, { $or: [{ 'home.players': { $elemMatch: { id: req.params.id } } }, { 'away.players': { $elemMatch: { id: req.params.id } } }] }] }, 'home away', function(err, stats) {
        if (err) {
            console.error(err);
            res.json({ success: false, msg: "error" })
        }
        console.log(stats);
        let statArray = [];
        for (let index in stats) {
            for (let x in stats[index].home.players) {
                if (stats[index].home.players[x].id == req.params.id) {
                    stats[index].home.players[x].opponent = stats[index].away.name;
                    stats[index].home.players[x].opponentId = stats[index].away._id;
                    statArray.push(stats[index].home.players[x]);
                }
            }
            for (let x in stats[index].away.players) {
                if (stats[index].away.players[x].id == req.params.id) {
                    stats[index].away.players[x].opponent = stats[index].home.name;
                    stats[index].away.players[x].opponentId = stats[index].home._id;
                    statArray.push(stats[index].away.players[x]);
                }
            }
        }

        res.json({ success: true, msg: "succesfull", stats: statArray })
    });

    //TODO: add this route
})

router.get('/referee/:id', function(req, res, next) {
    res.send("returns a specific player")
})





module.exports = router;
