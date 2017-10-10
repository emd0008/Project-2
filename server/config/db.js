"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
let pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'blogUser',
    password: 'blogPassword',
    database: 'BlogSchema'
});
function callProcedure(procedureName, args) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            else {
                var holder = '';
                if (args && args.length > 0) {
                    for (var i = 0; i < args.length; i++) {
                        if (i === args.length - 1) {
                            holder += '?';
                        }
                        else {
                            holder += '?, ';
                        }
                    }
                }
                var callString = 'CALL ' + procedureName + '(' + holder + ');';
                connection.query(callString, args, function (err, resultsets) {
                    connection.release();
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}
function rows(procedureName, args = []) {
    return callProcedure(procedureName, args)
        .then(function (resultsets) {
        return resultsets[0];
    });
}
exports.rows = rows;
function row(procedureName, args = []) {
    return callProcedure(procedureName, args)
        .then(function (resultsets) {
        return resultsets[0][0];
    });
}
exports.row = row;
function empty(procedureName, args = []) {
    return callProcedure(procedureName, args)
        .then(() => {
        return;
    });
}
exports.empty = empty;
