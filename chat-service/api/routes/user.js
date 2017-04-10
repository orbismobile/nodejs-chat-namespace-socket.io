/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/6/17.
 */

'use strict';

module.exports = (app, userEntity)=> {
    app.get('/user', (req, res, next)=> {
        userEntity.getUser().then((objectResolved)=> {
            res.status(200).send(objectResolved);
        }).catch(next);
    });
    app.get('/user/:userNickname', (req, res, next)=> {
        userEntity.getUserByNickname(req.params.userNickname).then((objectResolved)=> {
            res.status(200).send(objectResolved);
        }).catch(next);
    });
    app.get('/user/:userId/friends', (req, res, next)=> {
        userEntity.getFriendSByUserId(req.params.userId).then((objectResolved)=> {
            res.status(200).send(objectResolved);
        }).catch(next);
    });
    app.post('/user', (req, res, next)=> {
        userEntity.addUser(req.body.userName).then((objectResolved)=> {
            res.status(200).send(objectResolved);
        }).catch(next);
    });
};

