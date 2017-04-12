/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/8/17.
 */

'use strict';

class FriendEntity {

    constructor(connection) {
        this.connection = connection;
    }

    addFriend(friendId, userId) {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_PostFriend(?,?);', [friendId, userId], function (error, result, fields) {
                if (error) throw error;
                if (result.affectedRows == 1) {
                    resolve({
                        status: "SUCCESS",
                        message: "Friend Inserted"
                    });
                } else {
                    resolve({
                        status: "ERROR",
                        message: "An error happened"
                    });
                }
            });
        });
    }

    disconnect() {
        this.connection.end();
    }
}

module.exports.createFriend = (connectionObject)=> {
    return new FriendEntity(connectionObject);
};