"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const api_1 = require("./api");
let clientDir = path.join(__dirname, '../client');
let app = express();
app.use(express.static(clientDir));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('success');
    next();
});
app.use('/api', api_1.default);
app.listen(3000);
