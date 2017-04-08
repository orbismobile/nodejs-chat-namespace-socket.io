/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/8/17.
 */


'use strict';

class FriendEntity {

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
                        message: "Customer Inserted"
                    });
                } else {
                    resolve({
                        status: "ERROR",
                        message: "Ocurriop un error"
                    });
                }
            });
        });
    }

    getUser() {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_GetUser();', function (err, rows, fields) {
                if (err) throw err;

                var customerResponse = rows[0];

                if (rows[0].length == 0) {
                    resolve({
                        status: "ERROR",
                        message: "No existe producto en Base de Datos"
                    });
                } else {
                    resolve({
                        status: "SUCCESS",
                        message: "User was found",
                        products: customerResponse
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