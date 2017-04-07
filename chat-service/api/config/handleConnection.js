/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 4/6/17.
 */
'use strict';

const mysql = require("mysql");

module.exports.connect = (configJsonObject)=> {
    return new Promise((resolve, reject)=> {
        if (!configJsonObject.db.host) throw new Error("A host must be specified");
        if (!configJsonObject.db.user) throw new Error("A host user be specified");
        if (!configJsonObject.db.database) throw new Error("A database must be specified");
        if (!configJsonObject.db.port) throw new Error("A port must be specified");

        const connectionObject = mysql.createConnection(configJsonObject.db);
        resolve(connectionObject);
    });
};


