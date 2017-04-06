/**
 * Created by carlosleonardocamilo on 6/04/17.
 */

'use strict';

class UserEntity {

    constructor(connection) {
        this.connection = connection;
    }

    getUser() {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_GetEmployee();', function (error, result, fields) {
                if (error) throw error;

                if (result[0].length == 0) {
                    resolve({
                        status: "ERROR",
                        message: "No existe usuario en Base de Datos"
                    });
                } else {
                    resolve({
                        status: "SUCCESS",
                        message: "User was found",
                        data: result[0]
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