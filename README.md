# Nodejs-Express-Mysql-Socket.io-Docker 
Hi there! Today we're going to learn how to implement socket.io by the server-side 
 and communication with an android application.


## A few important concepts before starting


### Namespace

Socket.io allows us to "namespace" your sockets. But what does that mean?
It simply means assigning different "endpoints" or "paths" for a group, section, or channel of sockets. 
For example: "/namespaceCarlitosDroid", "/namespaceOrbisMobile", these can be my namespaces :3
This is very useful feature because by using it, we can minimize the number of resources
(TCP connections) and at the same time separate concerns within your application by introducing
separations between communications channels.

### Rooms


## Understanding Socket.io

