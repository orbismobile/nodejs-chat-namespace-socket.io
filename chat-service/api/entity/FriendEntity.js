/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/8/17.
 */

'use strict';

class FriendEntity {

    constructor(connection) {
        this.connection = connection;
    }

    addFriend(friendId, userId) {
        let that = this;
        return new Promise((resolve, reject)=> {
            this.connection.beginTransaction(function (err) {
                if (err) {
                    throw err;
                }

                that.connection.query('CALL sp_GetFriendByUserIdAndFriendId(?,?);', [friendId, userId], function (err, result) {
                    if (err) {
                        return that.connection.rollback(function () {
                            throw err;
                        });
                    }

                    if (result[0].length == 0) {
                        that.connection.query('CALL sp_PostFriend(?,?);', [friendId, userId], function (error, result, fields) {
                            if (error) throw error;
                            if (result.affectedRows == 1) {
                                resolve({
                                    status: "SUCCESS",
                                    message: "Friend inserted successful"
                                });
                            } else {
                                resolve({
                                    status: "ERROR",
                                    message: "An error happened"
                                });
                            }
                        });

                    } else {
                        resolve({
                            status: "SUCCESS",
                            message: "You already have added this user"
                        });
                    }
                });
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