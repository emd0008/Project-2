import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import api from './api';
import configurePassport from './config/passport';

const clientDir = path.join(__dirname, '../client');

const app = express();

app.use(express.static(clientDir));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);

app.use('/api', api);
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
