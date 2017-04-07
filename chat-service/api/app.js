/**
 * Created by carlosleonardocamilo on 5/04/17.
 */

const app = require("express")();
const httpServer = require("http").Server(app);
const Server = require("socket.io");
const config = require("./config/config");
const bodyParser = require("body-parser");
const handleConnection = require("./config/handleConnection");

const UserEntity = require("./entity/UserEntity");
const io = new Server(httpServer, {serverClient: false});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

handleConnection.connect(config).then((connectionObject)=> {
    console.log("starting server...");
    httpServer.listen(config.port, ()=> {
        console.log("listening by " + config.port + " port ");
    });

    let userEntity = UserEntity.createUser(connectionObject);
    require("./routes/user")(app, userEntity);

    io.sockets.on('connection', (socket)=> {
        console.log("USER SORT CONNECTED");
    });
}).catch((errorMessage)=> {
    console.log("no se puede iniciar el proyecto " + errorMessage);
});


















