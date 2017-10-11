"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const api_1 = require("./api");
const passport_1 = require("./config/passport");
const clientDir = path.join(__dirname, '../client');
const app = express();
app.use(express.static(clientDir));
app.use(cookieParser());
app.use(bodyParser.json());
passport_1.default(app);
app.use('/api', api_1.default);
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
