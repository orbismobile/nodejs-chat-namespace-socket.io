CREATE TABLE USER
(
  userId   INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  userName VARCHAR(50)     NOT NULL
);

CREATE TABLE FRIEND
(
  linkId   INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  friendId INT             NOT NULL,
  userId   INT             NOT NULL,
  CONSTRAINT FRIEND_USER_userId_fk FOREIGN KEY (friendId) REFERENCES USER (userId)
);

CREATE TABLE GROUPS_HEADER
(
  groupId   INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  groupName VARCHAR(50)     NOT NULL,
  userId    INT             NOT NULL
);

CREATE TABLE GROUPS_DETAIL
(
  groupId  INT(11) NOT NULL,
  friendId INT(11) NOT NULL,
  CONSTRAINT GROUPS_DETAIL_GROUPS_HEADER_groupId_fk FOREIGN KEY (groupId) REFERENCES GROUPS_HEADER (groupId),
  CONSTRAINT GROUPS_DETAIL_USER_userId_fk FOREIGN KEY (friendId) REFERENCES USER (userId)
);
CREATE INDEX GROUPS_DETAIL_GROUPS_HEADER_groupId_fk
  ON CHAT_DEMO.GROUPS_DETAIL (groupId);

INSERT INTO USER (userName) VALUES ('carlos');
INSERT INTO USER (userName) VALUES ('ronaldo');
INSERT INTO USER (userName) VALUES ('carlo');
INSERT INTO USER (userName) VALUES ('ricardo');
INSERT INTO USER (userName) VALUES ('jan');

INSERT INTO FRIEND (friendId, userId) VALUES (2, 1);
INSERT INTO FRIEND (friendId, userId) VALUES (3, 1);
INSERT INTO FRIEND (friendId, userId) VALUES (1, 2);
INSERT INTO FRIEND (friendId, userId) VALUES (3, 2);
INSERT INTO FRIEND (friendId, userId) VALUES (4, 2);
INSERT INTO FRIEND (friendId, userId) VALUES (4, 1);

/**********************************CRUD FOR USER*********************************/

#INSERT NEW USER
DROP PROCEDURE IF EXISTS sp_PostUser;
DELIMITER //
CREATE PROCEDURE sp_PostUser(IN _userName VARCHAR(50))
  BEGIN
    INSERT INTO USER (userName)
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

#GET USER EXCEPT ITSELF
DROP PROCEDURE IF EXISTS sp_GetUserExceptItself;
DELIMITER //
CREATE PROCEDURE sp_GetUserExceptItself(IN _userId INT)
  BEGIN
    SELECT *
    FROM USER
    WHERE USER.userId != _userId;
  END //
DELIMITER ;

#GET FRIEND BY USERID
DROP PROCEDURE IF EXISTS sp_GetUserByNickname;
DELIMITER //
CREATE PROCEDURE sp_GetUserByNickname(IN _userName VARCHAR(50))
  BEGIN
    SELECT
      userId,
      userName
    FROM USER
    WHERE userName = _userName;
  END //
DELIMITER ;

#GET FRIEND BY USERID
DROP PROCEDURE IF EXISTS sp_GetFriendsByUserId;
DELIMITER //
CREATE PROCEDURE sp_GetFriendsByUserId(IN _userId INT)
  BEGIN
    SELECT
      F.linkId,
      F.friendId,
      U.userName
    FROM FRIEND F
      INNER JOIN USER U ON F.friendId = U.userId
    WHERE F.userId = _userId;
  END //
DELIMITER ;

/**********************************CRUD FOR FRIEND*********************************/

DROP PROCEDURE IF EXISTS sp_GetFriendByUserIdAndFriendId;
DELIMITER //
CREATE PROCEDURE sp_GetFriendByUserIdAndFriendId(IN _friendId INT, IN _userId INT)
  BEGIN
    SELECT *
    FROM FRIEND
    WHERE friendId = _friendId AND userId = _userId;
  END //
DELIMITER ;

#INSERT NEW FRIEND
DROP PROCEDURE IF EXISTS sp_PostFriend;
DELIMITER //
CREATE PROCEDURE sp_PostFriend(IN _friendId INT, IN _userId INT)
  BEGIN
    INSERT INTO FRIEND (friendId, userId)
    VALUES (_friendId, _userId);
  END //
DELIMITER ;

/**********************************CRUD FOR GROUPS*********************************/

#GET GROUPS BY USERID
DROP PROCEDURE IF EXISTS sp_GetGroupsByUserId;
DELIMITER //
CREATE PROCEDURE sp_GetGroupsByUserId(IN _userId INT)
  BEGIN
    SELECT
      userId,
      groupId,
      groupName
    FROM GROUPS_HEADER
    WHERE userId = _userId;
  END //
DELIMITER ;

#POST GROUPS BY USERID
DROP PROCEDURE IF EXISTS sp_PostGroupByUserId;
DELIMITER //
CREATE PROCEDURE sp_PostGroupByUserId(IN _groupName VARCHAR(50), IN _userId INT)
  BEGIN
    INSERT INTO GROUPS_HEADER (groupName, userId) VALUES (_groupName, _userId);
  END //
DELIMITER ;

#GET GROUP MEMBERS
DROP PROCEDURE IF EXISTS sp_GetGroupMembersByGroupId;
DELIMITER //
CREATE PROCEDURE sp_GetGroupMembersByGroupId(IN _groupId INT)
  BEGIN
    SELECT
      *,
      userName
    FROM GROUPS_HEADER
      INNER JOIN GROUPS_DETAIL ON GROUPS_HEADER.groupId = GROUPS_DETAIL.groupId
      INNER JOIN USER ON GROUPS_DETAIL.friendId = USER.userId
    WHERE GROUPS_HEADER.groupId = _groupId;
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

