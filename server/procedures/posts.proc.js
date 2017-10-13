"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
function all() {
    return db_1.rows('GetPosts');
}
exports.all = all;
function read(id) {
    return db_1.row('GetPost', [id]);
}
exports.read = read;
function update(id, title, content, categoryid) {
    return db_1.empty('UpdatePost', [id, title, content, categoryid]);
}
exports.update = update;
function del(id) {
    return db_1.empty('DeletePost', [id]);
}
exports.del = del;
function insert(title, userid, categoryid, content) {
    return db_1.row('InsertPost', [title, userid, categoryid, content]);
}
exports.insert = insert;
