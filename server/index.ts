import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
const prerender = require('prerender-node');
import api from './api';
import stateRouting from './middleware/routing.mw';
import configurePassport from './config/passport';

const clientDir = path.join(__dirname, '../client');

const app = express();

app.use(express.static(clientDir));
app.use(cookieParser());
app.use(bodyParser.json());

configurePassport(app);

prerender.set('prerenderToken', 'YOUR_TOKEN');
app.use(prerender);

app.use('/api', api);
app.get('*', stateRouting);
app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
