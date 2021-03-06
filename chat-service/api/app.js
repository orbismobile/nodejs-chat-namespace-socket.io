/**
 * Created by Carlos Leonardo Camilo Vargas Huamán on 5/04/17.
 */

const app = require("express")();
const httpServer = require("http").Server(app);
const Server = require("socket.io");
const config = require("./config/config");
const bodyParser = require("body-parser");
const handleConnection = require("./config/handleConnection");

const UserEntity = require("./entity/UserEntity");
const FriendEntity = require("./entity/FriendEntity");
const GroupsEntity = require("./entity/GroupsEntity");
const io = new Server(httpServer, {serverClient: false});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

handleConnection.connect(config).then((connectionObject)=> {
    console.log("starting server...");
    httpServer.listen(config.port, ()=> {
        console.log("listening by " + config.port + " port ");
    });

    let userEntity = UserEntity.createUser(connectionObject);
    let friendEntity = FriendEntity.createFriend(connectionObject);
    let groupsEntity = GroupsEntity.createGroup(connectionObject);

    require("./routes/user")(app, userEntity);
    require("./routes/friend")(app, friendEntity);
    require("./routes/group")(app, groupsEntity);


    /**
     * @io.sockets Initial Default Namespace
     */
    io.sockets.on('connection', (socket)=> {
        console.log("USER SORT CONNECTED " + socket.id);

        /**
         *  @FirstArgument Your event's name
         *  @SecondArgument Emmit a message to everyone in this NameSpace
         */
        //io.sockets.emit('onDNConnect', "someone has connected");

        socket.on('onMessageToDNEmitted', function (userName, message) {
            socket.userName = userName;
            socket.message = message;
            io.sockets.emit('onDNConnect', userName + " : " + message);
        });

        // socket.on('newMessage', function (userId, message) {
        //     //console.log("newMessage " +message + " y el room es  "+socket.room );
        //     console.log("new message '" + message + "' emitted from " + userName
        //         + " to " + socket.id);
        //     socket.broadcast.to(userId).emit('updateChat', {
        //         userName: userName,
        //         message: message
        //     });
        // });


        socket.on('joinOwnRoom', function (roomName) {
            console.log("is joined to "+roomName);
            socket.join(roomName);

            // socket.userName = userName;
            // socket.roomOfUser = roomOfUser;
            // console.log(socket.userName + " is joined to " + socket.roomOfUser);
            // socket.join(socket.roomOfUser);
            //
            // socket.on('newMessage', function (userName, message) {
            //     //console.log("newMessage " +message + " y el room es  "+socket.room );
            //     console.log("new message '" + message + "' emitted from " + socket.userName
            //         + " to " + socket.roomOfUser);
            //     socket.broadcast.to(socket.roomOfUser).emit('updateChat', {
            //         userName: userName,
            //         message: message
            //     });
            // });
        });

        socket.on('joinGroup', function (roomName) {
            console.log("is joined to "+roomName);
            socket.join(roomName);
        });

        socket.on('newMessage', function (userName, message, roomName) {
            //console.log("newMessage " +message + " y el room es  "+socket.room );
            console.log("message: " + message + " emitted from " + userName
                + " to " + roomName);
            socket.broadcast.to(roomName).emit('updateChat', {
                userName: userName,
                message: message
            });
        });

    });
}).catch((errorMessage)=> {
    console.log("no se puede iniciar el proyecto " + errorMessage);
});


















