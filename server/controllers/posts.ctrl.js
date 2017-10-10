"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const procedures = require("../procedures/posts.proc");
let router = express.Router();
router.route('/')
    .get((req, res) => {
    procedures.all()
        .then((posts) => {
        res.send(posts);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
})
    .post((req, res) => {
    let newPost = req.body;
    procedures.insert(newPost.title, newPost.userid, newPost.categoryid, newPost.content)
        .then((id) => {
        res.status(201).send(id);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
router.route('/:id')
    .get((req, res) => {
    procedures.read(req.params.id)
        .then((post) => {
        res.send(post);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
})
    .put((req, res) => {
    procedures.update(req.params.id, req.body.content)
        .then(() => {
        res.sendStatus(204);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
})
    .delete((req, res) => {
    procedures.del(req.params.id)
        .then(() => {
        res.sendStatus(204);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});
exports.default = router;
