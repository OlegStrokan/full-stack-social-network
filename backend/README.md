### V_0.7.9

## Backend stack:
* ### Nest.js
* ### PostgreSQL
* ### Sequelize
* ### Swagger
* ### Docker


## Frontend stack:
* ### React
* ### Redux-toolkit
* ### Material UI


## Available endpoints:

- *@admin* - just for admin
- *@private* - for user and admin
- *@public* - for all users (include unauthorized)


Auth functional:
- POST */auth/registration - register new account* ```@public```
- POST */auth/login - login if you already have account* ```@public```
- GET */auth/me - is current user authorized* ```@private```

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
- PATCH */posts/:id - update  post* ```@private```
- DELETE */posts/:id - deleted post* ```@private```
- PATCH */posts/like/:id - like post* ```@private```
- DELETE */posts/like/:id - unlike post* ```@private```
- PATCH */posts/like/:id - dislike post* ```@private```
- DELETE */posts/like/:id - unDislike post* ```@private```



## Running the app

```bash

$ yarn
# development
$ yarn start:dev

# watch mode
$ yarn start

# production mode
$ yarn start:prod
```

## Run in docker container

```bash

# build
$ docker-compose build

# start
$ docker-compose up

```

*Open http://localhost:5000 to view it in browser.*

*Open *http://localhost:5000/api/docs* for view a swagger documentation.*
