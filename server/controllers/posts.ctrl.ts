import * as express from 'express';
import * as procedures from '../procedures/posts.proc';

let router = express.Router();

router.route('/')
    .get((req, res) => {
        procedures.all()
        .then((posts) => {
            res.send(posts);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
    })

export default router;