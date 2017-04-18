/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/15/17.
 */

module.exports = (app, groupsEntity)=> {
    app.get('/group/:groupId/members', (req, res, next)=> {
        groupsEntity.getGroupMembersByGroupId(req.params.groupId).then((objectResolved)=> {
            res.status(objectResolved.statusCode).send(objectResolved);
        }).catch(next);
    });
    app.post('/group', (req, res, next)=> {
        groupsEntity.postGroupByUserId(req.body.groupName, req.body.userId, req.body.friendIds).then((objectResolved)=> {
            res.status(objectResolved.statusCode).send(objectResolved);
        }).catch(next);
    });
    app.get('/user/:userId/groups', (req, res, next)=> {
        groupsEntity.getGroupsByUserId(req.params.userId).then((objectResolved)=> {
            res.status(objectResolved.statusCode).send(objectResolved);
        }).catch(next);
    });


};