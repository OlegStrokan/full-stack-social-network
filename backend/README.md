### V_4.1.0

## Backend stack:

* Nest.js - MVC framework
* PostgreSQL - Database
* Sequelize - ORM for mapping entities
* Swagger-API documentation
* Docker - Running app in container
* Websockets/socket.io - Library for websocket channel

## Available endpoints:

- ```@admin``` - just for admin
- ```@private``` - for user and admin
- ```@public``` - for all users (include unauthorized)

Auth functional:

- POST */auth/registration - register new account* ```@public```
- POST */auth/login - login if you already have account* ```@public```
- GET */auth/me - is current user authorized* ```@private```
- POST */auth/send_verification_email - send verification email* ```@public```
- PATCH */auth/verify_code - verify digit code* ```@public```
- PATCH */auth/set_password - set new password* ```@public```

Users functional:

- GET */users - get all users* ```@admin```
- POST */users - create user (register new account)* ```@public```
- POST */users/role/:id - assign a role to a user* ```@admin```
- POST */users/ban/:id - ban a user* ```@admin```
- DELETE */users/:id - delete certain user* ```@admin```

Roles functional:

- POST */roles - create role* ```@admin```
- GET */roles/:value - get role by value* ```@admin```
- GET */roles - get roles* ```@admin```

Profile functional:

- GET */profile/:id - get user's profile* ```@public```
- PATCH */profile/:id/status - change user's status* ```@private```
- POST */profile/:user_id/follow/:follow_id - follow user* ```@private```
- DELETE */profile/:user_id/unfollow/:follow_id - unfollow user* ```@private```
- PATCH */profile/:id/avatar - change user's avatar* ```@private```
- PATCH */profile/:id - change profile's data* ```@private```
- PATCH */profile/:id/image - change avatar* ```@private```
- GET */profile/:id/activate - activate user's profile* ```@private```
-

Posts functional

- GET */posts - get all posts* ```@public```
- GET */posts/:id - get post* ```@public```
- POST */posts - create new post* ```@private```
- PATCH */posts/:id - update post* ```@private```
- DELETE */posts/:id - deleted post* ```@private```
- PATCH */posts/like/:id - like post* ```@private```
- DELETE */posts/like/:id - unlike post* ```@private```
- PATCH */posts/like/:id - dislike post* ```@private```
- DELETE */posts/like/:id - unDislike post* ```@private```

Message functional

- WS *:8001 - messages page* ```@private```

Receiving events:

1. *createConversation* - Create new conversation
2. *leaveConversation* - Delete active conversation
3. *sendMessage* - Send new message

Sending events:

1. handleConnection - *conversations* - send conversation
2. joinConversation - *messages* - send all messages in conversation
3. sendMessage - *newMessage* = send new message to all active users

## Running the app

```bash
$ yarn
# development
$ yarn start:dev
```

```bash

# watch mode
$ yarn start
```

```bash
# production mode
$ yarn start:prod
```

## Run in docker container

```bash
# build
$ docker-compose build
```

```bash
# start
$ docker-compose up
```

*Open http://localhost:8000 (:dev mod) to view it in browser.*

*Open *http://localhost:8000/api/docs* for view a swagger documentation.*
