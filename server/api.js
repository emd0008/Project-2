"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const posts_ctrl_1 = require("./controllers/posts.ctrl");
const users_ctrl_1 = require("./controllers/users.ctrl");
const categories_ctrl_1 = require("./controllers/categories.ctrl");
let router = express.Router();
router.use('/posts', posts_ctrl_1.default)
    .use('/users', users_ctrl_1.default)
    .use('/categories', categories_ctrl_1.default);
exports.default = router;
