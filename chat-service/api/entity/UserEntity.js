/**
 * Created by carlosleonardocamilo on 6/04/17.
 */

'use strict';

class UserEntity {

    constructor(connection) {
        this.connection = connection;
    }

    addUser(userName) {
        let that = this;
        return new Promise((resolve, reject)=> {
            this.connection.beginTransaction(function (err) {
                if (err) {
                    throw err;
                }

                that.connection.query('CALL sp_GetUserByNickname(?);', userName, function (err, result) {
                    if (err) {
                        return that.connection.rollback(function () {
                            throw err;
                        });
                    }

                    if (result[0].length == 0) {

                        that.connection.query('CALL sp_PostUser(?);', [userName], function (error, result, fields) {
                            if (error) throw error;

                            console.log(result.affectedRows);
                            if (result.affectedRows == 1) {
                                resolve({
                                    status: "SUCCESS",
                                    message: "User added successful"
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
                            message: "User already exist "
                        });

                    }

                });
            });
        });
    }

    getUser() {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_GetUser();', function (err, rows, fields) {
                if (err) throw err;

                var userResponse = rows[0];

                if (rows[0].length == 0) {
                    resolve({
                        status: "ERROR",
                        message: "There's not user in CHAT_DEMO database"
                    });
                } else {
                    resolve({
                        status: "SUCCESS",
                        message: "User was found",
                        data: userResponse
                    });
                }
            });
        });
    }

    getUserByNickname(userNickname) {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_GetUserByNickName(?);', [userNickname], function (err, rows, fields) {
                if (err) throw err;
                var userResponse = rows[0];
                if (rows[0].length == 0) {
                    resolve({
                        status: "ERROR",
                        message: "No existe producto en Base de Datos"
                    });
                } else {
                    resolve({
                        status: "SUCCESS",
                        message: "User was found",
                        data: userResponse
                    });
                }
            });
        });
    }

    getFriendsByUserId(userId) {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_GetFriendsByUserId(?);', [userId], function (err, rows, fields) {
                if (err) throw err;
                var friendResponse = rows[0];
                if (rows[0].length == 0) {
                    resolve({
                        status: "ERROR",
                        statusCode: 301,
                        message: "This user has not friends"
                    });
                } else {
                    friendResponse.unshift({linkId: 0, friendId: 0, userName: "DefaultNamespace"})
                    resolve({
                        status: "SUCCESS",
                        statusCode: 200,
                        message: "Friend were found",
                        data: friendResponse
                    });
                }
            });
        });
    }

    getUserExceptItself(userId) {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_GetUserExceptItself(?);', [userId], function (err, rows, fields) {
                if (err) throw err;
                var userResponse = rows[0];
                if (rows[0].length == 0) {
                    resolve({
                        status: "ERROR",
                        message: "There aren't users in database"
                    });
                } else {
                    resolve({
                        status: "SUCCESS",
                        message: "Users were found",
                        data: userResponse
                    });
                }
            });
        });
    }

    disconnect() {
        this.connection.end();
    }
}

module.exports.createUser = (connectionObject)=> {
    return new UserEntity(connectionObject);
};