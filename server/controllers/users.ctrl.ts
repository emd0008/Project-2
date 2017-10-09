import * as express from 'express';
import {all} from '../procedures/user.proc';

let router = express.Router();

router.get('/', (req, res) => {
    all()
    .then((users) => {
        res.send(users);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

export default router;