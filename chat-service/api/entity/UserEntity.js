/**
 * Created by carlosleonardocamilo on 6/04/17.
 */

'use strict';

class UserEntity {

    constructor(connection) {
        this.connection = connection;
    }

    addUser(userName) {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_PostUser(?);', [userName], function (error, result, fields) {
                if (error) throw error;

                console.log(result.affectedRows);
                if (result.affectedRows == 1) {
                    resolve({
                        status: "SUCCESS",
                        message: "User Inserted"
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
                        message: "No existe cliente en Base de Datos"
                    });
                } else {
                    resolve({
                        status: "SUCCESS",
                        message: "Friend were found",
                        data: friendResponse
                    });
                }
            });
        });
    }

    getUserExceptItself(userId){
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