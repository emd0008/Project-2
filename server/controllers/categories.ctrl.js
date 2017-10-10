"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const categories_proc_1 = require("../procedures/categories.proc");
let router = express.Router();
router.get('/', (req, res) => {
    categories_proc_1.all()
        .then((categories) => {
        res.send(categories);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
exports.default = router;
