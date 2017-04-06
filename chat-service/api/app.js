/**
 * Created by carlosleonardocamilo on 5/04/17.
 */

const app = require("express")();
const httpServer = require("http").Server(app);
const Server = require("socket.io");
//const config = require("../config/config.json");
const bodyParser = require("body-parser");

const io = new Server(httpServer, {serverClient: false});

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

httpServer.listen(8181, ()=>{
    console.log("CONNNNNNECTEDD");
});

io.sockets.on('connection', (socket)=>{

    console.log("USER SORT CONNECTED");

});













