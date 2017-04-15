/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/15/17.
 */

'use strict';

class GroupsEntity {

    constructor(connection) {
        this.connection = connection;
    }

    getGroupsByUserId(userId) {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_GetGroupsByUserId(?);', [userId], function (err, rows, fields) {
                if (err) throw err;
                var userResponse = rows[0];
                if (rows[0].length == 0) {
                    resolve({
                        status: "ERROR",
                        statusCode: 404,
                        message: "No existe producto en Base de Datos"
                    });
                } else {
                    resolve({
                        status: "SUCCESS",
                        statusCode: 200,
                        message: "User was found",
                        data: userResponse
                    });
                }
            });
        });
    }

    postGroupByUserId(userId) {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_PostGroupByUserId(?);', [userId], function (error, result, fields) {
                if (error) throw error;

                console.log(result.affectedRows);
                if (result.affectedRows == 1) {
                    resolve({
                        status: "SUCCESS",
                        statusCode: 201,
                        message: "User added successful"
                    });
                } else {
                    resolve({
                        status: "ERROR",
                        statusCode: 404,
                        message: "An error happened"
                    });
                }
            });
        });
    }

    getGroupMembersByGroupId(groupId) {
        return new Promise((resolve, reject)=> {
            this.connection.query('CALL sp_GetGroupMembersByGroupId(?);', [groupId], function (err, rows, fields) {
                if (err) throw err;
                var userResponse = rows[0];
                if (rows[0].length == 0) {
                    resolve({
                        status: "ERROR",
                        statusCode: 404,
                        message: "No existe producto en Base de Datos"
                    });
                } else {
                    resolve({
                        status: "SUCCESS",
                        statusCode: 200,
                        message: "User was found",
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


module.exports.createGroup = (connectionObject)=> {
    return new GroupsEntity(connectionObject);
};