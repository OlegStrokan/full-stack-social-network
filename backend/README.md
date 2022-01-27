### V_1.9.4

# First backend app


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


Auth functional:
- POST */auth/registration - register new account*
- POST */auth/login - login if you already have account*

Users functional:
- GET */users - get all users*
- POST */users - create user (register new account)*
- POST */users/role/:id - assign a role to a user*
- POST */users/ban/:id - ban a user*
- DELETE */users/:id - delete certain user*

Roles functional:
- POST */roles - create user's role*
- GET */roles/:value - get user's role*


Posts functional
- GET */posts - get all posts*
- GET */posts/:id - get post*
- POST */posts - create new post*
- PATCH */posts/:id - update existed post*
- PATCH */posts/like/:id - like existed post*
- DELETE */posts/:id - deleted existed post*
- DELETE */posts/like/:id - like existed post*



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
