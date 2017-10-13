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
        });
    });
    
router.post('/', (req, res) => {
        let newPost = req.body;
        procedures.insert(newPost.title, newPost.userid, newPost.categoryid, newPost.content)
        .then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
    });

    router.route('/:id')
        .get((req, res) => {
            procedures.read(req.params.id)
            .then((post) => {
                res.send(post);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
        })
        .put((req, res) => {
            procedures.update(req.params.id, req.body.title, req.body.content, req.body.categoryid)
            .then(() => {
                res.sendStatus(204);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
        })
        .delete((req, res) => {
            procedures.del(req.params.id)
            .then(() => {
                res.sendStatus(204);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
        });

export default router;