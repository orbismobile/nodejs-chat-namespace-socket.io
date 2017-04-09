/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/8/17.
 */


'use strict';

class FriendEntity {

    constructor(connection) {
        this.connection = connection;
    }

    addFriend(friendName) {
        return new Promise((resolve, reject)=> {

            this.connection.query('CALL sp_PostFriend(?);', [friendName], function (error, result, fields) {
                if (error) throw error;

                console.log(result.affectedRows);
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

    getFriend() {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_GetFriend();', function (err, rows, fields) {
                if (err) throw err;

                var friendResponse = rows[0];

                if (rows[0].length == 0) {
                    resolve({
                        status: "ERROR",
                        message: "There's not friend in CHAT_DEMO database"
                    });
                } else {
                    resolve({
                        status: "SUCCESS",
                        message: "Friend was found",
                        products: friendResponse
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