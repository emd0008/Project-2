"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
function all() {
    return db_1.rows('GetUsers');
}
exports.all = all;
function readByEmail(email) {
    return db_1.row('GetUserByEmail', [email]);
}
exports.readByEmail = readByEmail;
function read(id) {
    return db_1.row('GetUser', [id]);
}
exports.read = read;
