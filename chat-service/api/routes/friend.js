/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/8/17.
 */

'use strict';

module.exports = (app, userEntity)=> {
    app.post('/friend', (req, res, next)=> {
        userEntity.addFriend(req.body.friendId, req.body.userId).then((objectResolved)=> {
            res.status(200).send(objectResolved);
        }).catch(next);
    });
};
