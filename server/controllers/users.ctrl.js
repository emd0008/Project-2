"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const user_proc_1 = require("../procedures/user.proc");
let router = express.Router();
router.get('/', (req, res) => {
    user_proc_1.all()
        .then((users) => {
        res.send(users);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
exports.default = router;
