/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/8/17.
 */

'use strict';

module.exports = (app, userEntity)=> {
    app.get('/friend', (req, res, next)=> {
        userEntity.getUser().then((objectResolved)=> {
            res.status(200).send(objectResolved);
        }).catch(next);
    });
};
