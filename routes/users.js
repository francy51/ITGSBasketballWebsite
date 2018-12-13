module.exports = function(app, passport) {

    const jwt = require('jsonwebtoken');
    const jwtConfig = require("../config/jwt")
    // PROFILE SECTION =========================
    app.get('/user/profile', function(req, res) {
        res.send(req.user)
    });

    // LOGOUT ==============================
    app.get('/user/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    //This chekcs for the users session and keeps it alive. Need to create a middlewear that check the tokens as they come in
    app.get('/user/session', function(req, res) {
        //account is logged in so let it get a token
        if (isLoggedIn(req))
            res.redirect('/user/token');
        else
            res.redirect("/error");

    })

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================



    // process the login form
    app.post('/user/login', passport.authenticate('local-login', {
        successRedirect: '/user/token', // redirect to the secure profile section
        failureRedirect: '/error', // redirect back to the signup page if there is an error
    }));


    // process the signup form
    app.post('/user/signup', passport.authenticate('local-signup', {

        successRedirect: '/user/token', // redirect to the secure profile section
        failureRedirect: '/error', // redirect back to the signup page if there is an error
    }));

    app.get('/user/token', function(req, res, next) {
        if (isLoggedIn(req)) {
            let user = { "id": req.user._id, "email": req.user.local.email, "adminLevel": req.user.local.adminLevel }
            const token = jwt.sign(user, jwtConfig.secret);
            res.json({ user, token });
        }
        else {
            res.redirect('/error')
        }

    })

    app.get('/error', function(req, res) {
        res.status(401);
        res.send("action failed");
    })

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/auth/twitter', passport.authenticate('twitter', { scope: 'email' }));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });
    app.post('/connect/local', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/connect/local', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // facebook -------------------------------

    // send to facebook to do the authentication
    app.get('/connect/facebook', passport.authorize('facebook', { scope: ['public_profile', 'email'] }));

    // handle the callback after facebook has authorized the user
    app.get('/connect/facebook/callback',
        passport.authorize('facebook', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope: 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));


    // google ---------------------------------

    // send to google to do the authentication
    app.get('/connect/google', passport.authorize('google', { scope: ['profile', 'email'] }));

    // the callback after google has authorized the user
    app.get('/connect/google/callback',
        passport.authorize('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. for social accounts, just remove the token
    // for local account, remove email and password
    // user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user = req.user;
        user.local.email = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // facebook -------------------------------
    app.get('/unlink/facebook', isLoggedIn, function(req, res) {
        var user = req.user;
        user.facebook.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // twitter --------------------------------
    app.get('/unlink/twitter', isLoggedIn, function(req, res) {
        var user = req.user;
        user.twitter.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

    // google ---------------------------------
    app.get('/unlink/google', isLoggedIn, function(req, res) {
        var user = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });


};

// route middleware to ensure user is logged in
function isLoggedIn(req) {
    if (req.isAuthenticated())
        return true;
    else
        return false;
}
