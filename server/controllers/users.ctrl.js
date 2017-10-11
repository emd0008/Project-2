"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const passport = require("passport");
const procedures = require("../procedures/user.proc");
const auth = require("../middleware/auth.mw");
const router = express.Router();
router.route('/')
    .get((req, res) => {
    procedures.all()
        .then((users) => {
        res.send(users);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (!user) {
            return res.sendStatus(401);
        }
        req.logIn(user, (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            else {
                delete user.password;
                return res.send(user);
            }
        });
    })(req, res, next);
});
router.all('*', auth.isLoggedIn);
router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(() => {
            req.logOut();
            res.sendStatus(204);
        });
    }
});
router.get('/me', (req, res) => {
    res.send(req.user);
});
exports.default = router;
