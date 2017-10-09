import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import api from './api';

let clientDir = path.join(__dirname, '../client');

let app = express();

app.use(express.static(clientDir));
app.use(bodyParser.json());
app.use((req, res, next) => {
    console.log('success');
    next();
});
app.use('/api', api);
app.listen(3000);
