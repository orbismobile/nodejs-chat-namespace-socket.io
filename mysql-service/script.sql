CREATE TABLE CHAT_DEMO.USER
(
  id_user INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL
)











































# CREATE TABLE USER (
#   id_user   INT(10)     NOT NULL AUTO_INCREMENT,
#   user_name VARCHAR(50) NOT NULL,
#   PRIMARY KEY (id_user)
# )
#   ENGINE = INNODB;
#
#
# CREATE TABLE ROOM (
#   id_room   INT(10)     NOT NULL AUTO_INCREMENT,
#   room_name VARCHAR(50) NOT NULL,
#   PRIMARY KEY (id_room)
# )
#   ENGINE = INNODB;
#
#
# CREATE TABLE USER_FRIEND (
#   id_user   INT(10) NOT NULL,
#   id_friend INT(10) NOT NULL,
#   friend_name VARCHAR(50) NOT NULL
# )
#   ENGINE = INNODB;
#
# CREATE TABLE ROOM_USER (
#   id_room INT(10) NOT NULL,
#   id_user INT(10) NOT NULL
# )
#   ENGINE = INNODB;
#
# ALTER TABLE ROOM_USER
#   ADD INDEX FKUSER816609 (id_user),
#   ADD CONSTRAINT FKUSER816609
# FOREIGN KEY (id_user) REFERENCES USER (id_user);
#
# ALTER TABLE ROOM_USER
#   ADD INDEX FKUSER816610 (id_room),
#   ADD CONSTRAINT FKUSER816610
# FOREIGN KEY (id_room) REFERENCES ROOM (id_room);
#
# CREATE TABLE CHAT_DEMO.FRIEND
# (
#   id_friend INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
#   friend_name VARCHAR(50) NOT NULL
# );
#
# CREATE TABLE CHAT_DEMO.USER_FRIEND
# (
#   id_user INT(11) NOT NULL,
#   id_friend INT(11) NOT NULL,
#   CONSTRAINT USER_FRIEND_USER_id_user_fk FOREIGN KEY (id_user) REFERENCES USER (id_user),
#   CONSTRAINT USER_FRIEND_FRIEND_id_friend_fk FOREIGN KEY (id_friend) REFERENCES FRIEND (id_friend)
# );
# CREATE INDEX USER_FRIEND_FRIEND_id_friend_fk ON CHAT_DEMO.USER_FRIEND (id_friend);
# CREATE INDEX USER_FRIEND_USER_id_user_fk ON CHAT_DEMO.USER_FRIEND (id_user);


INSERT INTO USER (user_name) VALUES ('carlos');
INSERT INTO USER (user_name) VALUES ('ronaldo');
INSERT INTO USER (user_name) VALUES ('eduardo');
INSERT INTO USER (user_name) VALUES ('jose');

INSERT INTO ROOM (room_name) VALUES ('carlosRoom');
INSERT INTO ROOM (room_name) VALUES ('ronaldoRoom');
INSERT INTO ROOM (room_name) VALUES ('eduardoRoom');
INSERT INTO ROOM (room_name) VALUES ('joseRoom');

INSERT INTO ROOM_USER (id_room, id_user) VALUES (1, 1);
INSERT INTO ROOM_USER (id_room, id_user) VALUES (2, 2);
INSERT INTO ROOM_USER (id_room, id_user) VALUES (3, 3);
INSERT INTO ROOM_USER (id_room, id_user) VALUES (4, 4);
INSERT INTO ROOM_USER (id_room, id_user) VALUES (2, 1);
INSERT INTO ROOM_USER (id_room, id_user) VALUES (3, 1);
INSERT INTO ROOM_USER (id_room, id_user) VALUES (4, 1);

INSERT INTO USER_FRIEND(id_user, id_friend, friend_name) VALUES(1, 2, 'ronaldo');
INSERT INTO USER_FRIEND(id_user, id_friend, friend_name) VALUES(1, 3, 'eduardo');
INSERT INTO USER_FRIEND(id_user, id_friend, friend_name) VALUES(1, 4, 'jose');

/**********************************CRUD FOR USER*********************************/

#INSERT NEW USER
DROP PROCEDURE IF EXISTS sp_PostUser;
DELIMITER //
CREATE PROCEDURE sp_PostUser(IN _userName VARCHAR(50))
  BEGIN
    INSERT INTO USER (user_name)
    VALUES (_userName);
  END //
DELIMITER ;

#GET USER
DROP PROCEDURE IF EXISTS sp_GetUser;
DELIMITER //
CREATE PROCEDURE sp_GetUser()
  BEGIN
    SELECT *
    FROM USER;
  END //
DELIMITER ;


/*
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE USER;
TRUNCATE TABLE ROOM;
TRUNCATE TABLE ROOM_USER;
SET FOREIGN_KEY_CHECKS = 1;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE USER;
DROP TABLE ROOM;
DROP TABLE ROOM_USER;
DROP TABLE USER_FRIEND;
SET FOREIGN_KEY_CHECKS = 1;


#room
SELECT ROOM_USER.id_room, ROOM.room_name
FROM ROOM_USER
  INNER JOIN ROOM ON ROOM_USER.id_room = ROOM.id_room
WHERE ROOM_USER.id_user = 1 AND (ROOM_USER.id_room != 1);


#friends
SELECT USER_FRIEND.id_friend, USER_FRIEND.friend_name
FROM USER_FRIEND
WHERE USER_FRIEND.id_user = 1;*/




