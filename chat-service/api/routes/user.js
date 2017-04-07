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
};

