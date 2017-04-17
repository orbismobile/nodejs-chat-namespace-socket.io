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

    postGroupByUserId(groupName, userId, friendIds) {
        let that = this;
        return new Promise((resolve, reject)=> {
            this.connection.beginTransaction(function (err) {
                if (err) {
                    throw err;
                }

                that.connection.query('INSERT INTO GROUPS_HEADER (groupName, userId) VALUES (?, ?);', [groupName, userId], function (error, results, fields) {
                    if (error) throw error;

                    console.log("*** first insert ***");
                    console.log(results);
                    if (results.affectedRows == 1) {

                        let sqlQuery = "INSERT INTO GROUPS_DETAIL (groupId, friendId) VALUES ?";

                        var nestedArray = [];
                        friendIds.forEach(function (id) {
                            var detailArray = [];
                            detailArray.push(results.insertId);
                            detailArray.push(id);
                            nestedArray.push(detailArray);
                        });

                        that.connection.query(sqlQuery, [nestedArray], function (error, result, fields) {
                            if (error) throw error;
                            console.log("*** second insert ***");
                            console.log(result);
                            if (result.affectedRows > 0) {
                                resolve({
                                    status: "SUCCESS",
                                    statusCode: 201,
                                    message: "GroupDetail added successful"
                                });
                            } else {
                                resolve({
                                    status: "ERROR",
                                    statusCode: 404,
                                    message: "An error happened"
                                });
                            }
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