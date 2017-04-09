/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/8/17.
 */

'use strict';

module.exports = (app, userEntity)=> {
    app.get('/friend', (req, res, next)=> {
        userEntity.getFriend().then((objectResolved)=> {
            res.status(200).send(objectResolved);
        }).catch(next);
    });
    app.post('/friend', (req, res, next)=> {
        userEntity.addFriend(req.body.friendName).then((objectResolved)=> {
            res.status(200).send(objectResolved);
        }).catch(next);
    });
};
