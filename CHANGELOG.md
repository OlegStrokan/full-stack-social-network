# v3.5.2 (25.04.2022)

## Fixes:

Frontend:
1. Fixed error with socket initialization

# v3.5.1 (25.04.2022)

## Features:

Frontend:
1. Added correctly working conversation (just prototype)

# v3.5.0 (25.04.2022)

## Features:

Frontend:
1. Updated frontend message logic (conditions, dtos)

# v3.4.0 (24.04.2022)

## Features:

Backend:
1. Added send message and join conversation methods
2. Updated decorators in message gateway

# v3.3.1 (24.04.2022)

## Features:

Backend:
1. Added handle connection method (checks if current user authorized)
2. Added get/leave conversation methods

# v3.3.0 (24.04.2022)

## Features:

Backend:
1. Added messages module
2. Added new conversation, active-conversations and messages module
3. Updated user module with relations

## Fixes:

Backend
1. Rewrite some snake_case to camelCase

# v3.2.0 (23.04.2022)

## Features:

Frontend:
1. Updated add post form

Backend:
1. Updated response value in post service
## Fixes:

Frontend
1. Fixed create post method
2. Fixed scroll in profile gallery


# v3.1.5 (23.04.2022)

## Features:

Frontend:
1. Reversed posts array in profile page
2. Updated styles in profile gallery

# v3.1.4 (23.04.2022)

## Features:

Frontend:
1. Updated Profile info, removed grid gap

# v3.1.3 (22.04.2022)

## Features:

Frontend:
1. Updated Profile Header
2. Added profile header css module

# v3.1.2 (22.04.2022)

## Features:

Frontend:
1. Updated global theme
2. Updated profile header layout
3. Fixed issues with min-height

# v3.1.1 (22.04.2022)

## Features:

Frontend:
1. Added custom material ui theme

# v3.1.0 (22.04.2022)

## Features:

Frontend:
1. Added Modal window for forgot password
2. Added error handling for auth redux

Backend:
Updated return data in verify code method

# v3.0.0 (18.04.2022)

## Features:

Frontend:
1. Finished profile. Removed cors from backend

# v2.9.9.1 (18.04.2022)

## Features:

Frontend:
1. Added updated profile component
2. Validator,
3. Updated profile saga


# v2.9.9 (18.04.2022)

## Features:

Frontend:
1. Deleted unnecessary files, updated messages types

# v2.9.8 (18.04.2022)

## Features:

Frontend:
1. Updated forgot password functional
2. Added modal window when password was updated

# v2.9.7. (15.04.2022)

## Features:

Frontend:
1. Updated route logic
2. Added add message functional

#2.9.6. (14.04.2022)

## Features:

Frontend:
1. Added Conversation component
2. Change conversation list
3. Added logic to add message component

# v2.9.5. (14.04.2022)

## Features:

Frontend:
1. Added Message form, conversation list
2. Tested receive message method

# v2.9.3 (14.04.2022)

## Fixes:

Frontend:
1. Fixed all messages method on backend

# v2.9.2 (13.04.2022)

## Fixes:

Frontend:
1. Fixed get conversation method in backend

# v2.9.1 (11.04.2022)

## Features:

Frontend:
1. Added getConversation/initializeSocket sagas
2. Added socket instance with user's credentials

# v2.9.0 (11.04.2022)

## Features:

Frontend:
1. Updated socket api (not complete)

## Fixes:

Frontend:
1. Fixed error with socket's credentials


# v2.8.9 (11.04.2022)

## Features:

Frontend:
1. Added Message api (subscribe/unsubscribe methods)
2. Added new types for messages api

# v2.8.8 (10.04.2022)

## Features:

Frontend:
1. Added Components for message page

## Fixes:

Frontend:
1. Deleted unnecessary code from message component

# v2.8.7 (10.04.2022)

## Features:

Backend:
1. Updated message's gateway

Frontend:
1. Updated message's redux


# v2.8.6 (6.04.2022)

## Features:

Backend:
1. Updated message's gateway

Frontend:
1. Updated message's redux

# v2.8.5 (6.04.2022)

## Features:

Frontend
1. Added Conversation component
2. Change conversation list
3. Added logic to add message component

# v2.8.4 (5.04.2022)

## Features:

Frontend:
1. Added Message form, conversation list
2. Tested receive message method

# v2.8.3 (3.04.2022)

## Features:

Backend:
1. Updated change password method
2. Updated auth endpoints

# v2.8.2 (1.04.2022)

## Features:

Backend:
1. Added change password method
2. Changed mail service

# v2.8.1 (1.04.2022)

## Features:

Backend:
1. Added forgot password endpoint
2. Added forgot password mail method

# v2.8.0 (28.03.2022)

## Features:

Backend:
1. Added redux for messages
2. Added message and conversation dto
3. Added message component

# v2.7.2 (28.03.2022)

## Fixes:

Backend:
1. Fixed all requests to database

# v2.7.1 (27.03.2022)

## Fixes:

Backend:
1. Fixed create conversation method

# v2.7.0 (25.03.2022)

## Features:

Backend:
1. Updated requests to database
2. Updated creation interfaces

# v2.6.9 (24.03.2022)

## Features:

Backend:
1. Updated models (for message) updated app.
2. Deleted helper methods

# v2.6.8 (24.03.2022)

## Features:

Backend:
1. Added subscribe methods: send message, create/join/leave conversation

# v2.6.7 (21.03.2022)

## Features:

Backend:
1. Added handle connect/disconnect methods for messages

# v2.6.5 (21.03.2022)

## Features:

Backend:
1. Added helper methods for development
2. Added methods for get conversation, users and conversations with users

# v2.6.4 (21.03.2022)

## Features:

Backend:
1. Updated message and conversation model
2. Added join/leave conversation methods. Added methods for messages

# v2.6.3 (21.03.2022)

## Features:

Backend:
1. Added get conversation and create conversation methods
2. Updated conversation interface

# v2.6.2 (20.03.2022)

## Features:

Backend:
1. Injected models in conversation service

## Fixed:

Backend: 
1. Fixed models in message module

# v2.6.1 (20.03.2022)

## Features:

Backend:
1. Added license

# v2.6.0 (16.03.2022)

## Features:

Backend:
1. Added conversation service, model.
2. Added user-conversation, active-conversation and message-conversation models

# v2.5.2
## Features:

Backend:
1. Deleted alerts
2. Added message module, model
3. Changed User model

# v2.5.1 (16.03.2022)

## Features:

Backend:
1. Added alert namespace
2. Updated chat namespace


# v2.5.0 (16.03.2022)

## Features:

Backend:
1. Added basic websockets initialized

# v2.4.2 (15.03.2022)

## Features:

Frontend:
1. Refactored users page
2. Updated add role, ban user functional (not complete)


# v2.4.1 (15.03.2022)

## Features:

Frontend:
1. Added add role to user in users page.
2. Added add role validator

# v2.4.0 (13.03.2022)

## Features:

Frontend:
1. Updated users page. Added form for ban user (not complete)
2. Added ban user validator

# v2.3.9 (13.03.2022)

## Features:

Frontend:
1. Updated likes/unlike on post component (final version)

## Fixes:
Backend:

1. Fixed post services, fixed requests to database

# v2.3.8 (13.03.2022)

## Features:

Backend:
1. Change return data in post service,

## Fixes:

Frontend:
1. Fixes render posts in profile page

# v2.3.7 (11.03.2022)

## Features:

Frontend:
1. Updated dislike/undislike in post and profile slice (not complete)

# v2.3.6 (11.03.2022)

## Features:

Frontend:
1. Updated dislike/undislike to post's api, slice, sagas

# v2.3.5 (11.03.2022)

## Features:

Frontend:
1. Updated like/unlike in post component


## Fixes:

Backend:
1.Fixed nested copy of user's posts in backend

# v2.3.4 (10.03.2022)

## Features:

Backend:
1. Updated post service
2. Added getPostById (userId)

Frontend:
1. Added like/unlike login to frontend
2. Changed redux, api, sagas.

# v2.3.3 (9.03.2022)

## Features:

Backend:
1. Updated readMe on backend

# v2.3.2 (9.03.2022)

## Features:

Backend:
1. Added dislike, unDislike correctly working method

# v2.3.1 (9.03.2022)

## Features:

Backend:
1. Updated like/unlike methods

# v2.3.0 (8.03.2022)

## Features:

Backend:
1. Added dislike model
2. Added correctly working relation between post, like/dislike models
3. Updated like method

# v2.2.0 (6.03.2022)

## Features:

Frontend:
1. Updated change image in gallery while changing post
2. Fixed post rerender in profile page while updating

# v2.1.9 (6.03.2022)

## Features:

Backend:
1. Added change image in gallery while change post

# v2.1.8 (6.03.2022)

## Features:

Frontend:
1. Added AddRole form
2. Added validator for role

## Fixes:
1. Fixed role saga

# v2.1.7 (6.03.2022)

## Features:

Backend:
1. Fixed role guard

# v2.1.6 (5.03.2022)

## Features:

Frontend:
1. Added private endpoint, role restrictions. Changed auth.slice

# v2.1.5 (2.03.2022)

## Features:

Frontend:
1. Added differentiation of functionality for the profile owner and the regular user

# v2.1.4 (2.03.2022)

## Features:

Frontend:
1. Updated styles in profile header and profile posts

# v2.1.3 (1.03.2022)

## Features:

Frontend:
1. Updated profile page (posts, entities components)

# v2.1.2 (1.03.2022)

## Features:

Backend:
1. Added role guard, role decorator

2. # v2.1.1 (1.03.2022)

## Features:

Backend:
1. Updated like/unlike functional on backend (not complete)

Frontend:
1. Change post's redux in frontend

# v2.1.0 (28.02.2022)

## Features:

Frontend:
1. Added working update photo functional
2. Added post edit component
3. Added update post validator

# v2.0.3 (28.02.2022)

## Features:

Backend:
1. Changed photo model
2. Added image deletion when deleting a post functional

3. # v2.0.2 (27.02.2022)

## Features:

Frontend:
1. Updated profile gallery component

# v2.0.1 (26.02.2022)

## Features:

Frontend:
1. Updated add post functional.
2. Added file control for add post component

## Fixes:

Backend:
1. Updated return value on change status function

# v2.0.0 (26.02.2022)

## Features:

Frontend:
1. Added profile gallery component
2. Added route and logic system for displayed profile gallery

# v1.9.9 (26.02.2022)

## Features:

Backend:
1.  Added add photo to the gallery when adding a post functional.

# v1.9.8 (26.02.2022)

## Features:

Frontend:
1. Added change avatar functional for frontend
2. Changed payload in profile slice

# v1.9.7 (25.02.2022)

## Features:

Frontend:
1. Updated profile info
2. Changed post's component

## Features:

Frontend:
Fixed profile image link.

# v1.9.6 (23.02.2022)

## Features:

Frontend:
1. Changed return values in profile services
2. Changed profileInfo component
3. Updated dto description

# v1.9.5 (23.02.2022)

## Features:

Frontend:
1. Added post component.
2. Added functional for posts page.
3. Change types in slices and sagas

## Fixes:

Frontend: Fixed rerender error with posts in profile page

4. # v1.9.4 (23.02.2022)

## Features:

Frontend:
1. Changed return value in post api in frontend

Backend:
1. Updated auth/post/profile's return value in backend
# v1.9.3 (22.02.2022)

## Features:

Frontend:
1. Added delete post functional to UI
2. Refactor in profile's folder

# v1.9.2 (21.02.2022)

## Features:

Frontend:
1. Added addPost component with functional
2. Added createPost dto and validation for post

# v1.9.1 (21.02.2022)

## Features:

Frontend:
1. Added photo dto

## Fixes:

Frontend:
1. Fixed create/update post api method

# v1.9.0 (21.02.2022)

## Features:

Backend:
1. Added photo model for user
2. Added add image method for profile

# v1.8.2 (20.02.2022)

## Features:

Backend:
1. Updated get profile method

Frontend:
1. Updated posts in profile page

## Fixes:
Backend
1. Fixed create post method

# v1.8.1 (20.02.2022)

## Features:

Frontend:
1. Added editable mode for profile status
2. Added correct update status functional
3. Added status validator

# v1.8.0 (20.02.2022)

## Features:

Frontend:
1. Added profile entities page
2. Added update status for profile page
3. Changed grid in profile page

# v1.7.3 (19.02.2022)

## Features:

Backend:
1. Added update profile for frontend


# v1.7.2 (19.02.2022)

## Features:

Backend:
1. Updated update profile method

# v1.7.1 (19.02.2022)

## Features:

Backend:
1. Updated user model

# v1.7.0 (18.02.2022)

## Features:

Backend:
1. Added update profile function

# v1.6.9 (18.02.2022)

## Features:

Frontend:
1. Update user's profile
1. Added new profile's components

# v1.6.8 (18.02.2022)

## Features:

Frontend:
1. Added logout functional

# v1.6.7 (18.02.2022)

## Features:

Frontend:
1. Changed main layout

Backend:
1. Added default avatar in create user function

# v1.6.6 (18.02.2022)

## Features:

Frontend:
1. Added header component, location to header

# v1.6.5 (17.02.2022)

## Features:

Frontend:
1. Added initialize slice and saga for correctly initial render

# v1.6.4 (17.02.2022)

## Features:

Frontend:
1. Updated route and redirect functional

# v1.6.3 (17.02.2022)

## Fixes:

Frontend:
1. Fixed profile's, role's, user's functional
2. Deleted unnecessary action types

# v1.6.2 (17.02.2022)

## Fixes:

Frontend:
1. Fixed post's functional
2. Deleted unnecessary action types

# v1.6.1 (17.02.2022)

## Fixes:

Frontend:
1. Fixed auth functional
2. Deleted unnecessary action types

# v1.6.0 (16.02.2022)

## Features:

Backend:
1. Added auth/me method

Frontend:
1. Added auth/me api method
2. Added some logic to profile page

## Fixes:

Backend:
1. Reformat code with new prettier

# v1.5.1 (16.02.2022)

## Features:

Backend: 

1. Added getRoles method

## Fixes:

Backend:
1. Changed return value in role service

# v1.5.0 (16.02.2022)

## Features:

Frontend:
1. Added redux for role (slice, actions, sagas)
2. Added roles page
3. Added getRoles api method

# v1.4.1 (16.02.2022)

## Features:

Frontend:
1. Added users component

## Fixed:
1. Fixed errors with user's redux

# v1.4.0 (16.02.2022)

## Features:

Frontend:
1. Added user's saga. Changed payload in user's slice

# v1.3.9 (15.02.2022)

## Features:

Frontend:
1. Added user's slice

# v1.3.8 (15.02.2022)

## Features:

Frontend:
1. Added user's action types
2. Added new interfaces for users
3. Changed return value in user service

# v1.3.7 (15.02.2022)

## Features:

Frontend:
1. Added post's sagas
2. Changed post's action types

# v1.3.6 (15.02.2022)

## Features:

Backend:
1. Changed return value in post services.

# v1.3.5 (15.02.2022)

## Features:

Frontend:
1. Added post's slice
2. Changed return value in post api

# v1.3.4 (14.02.2022)

## Features:

Frontend:
1. Added post's action types
2. Changed payload for profile api

# v1.3.3 (13.02.2022)

## Features:

Frontend:
1. Added sagas watchers 
2. Change action types
3. Tested getProfile functional

Backend:
1. Changed return value in profile service

# v1.3.2 (13.02.2022)

## Features:

Frontend:
1. Added profile's sagas
2. Fixed return value in action interfaces

Backend:
1. Changed return value in profile service

# v1.3.1 (13.02.2022)

## Features:

Frontend:
1. Added all reducers and reducers types for profile

# v1.3.0 (12.02.2022)

## Features:

Frontend:

1. Added redux for profile
2. Changed payload types for profile api

# v1.2.2 (11.02.2022)

## Features:

Frontend:

1. Added registration functional

# v1.2.1 (11.02.2022)

## Features:

Frontend:

1. Changed action types.
2. Working login functional (frontend)

# v1.2.0 (11.02.2022)

## Features:

Frontend:

1. Added saga for auth (login)
2. Added auth interfaces.
3. Changed action types

# v1.1.0 (11.02.2022)

## Features:

Frontend:

1. Add redux store, root saga.
2. Added redux logic for auth

Backend: 
1. Minor fix in user controller

# v1.0.2 (11.02.2022)

## Features:

Frontend:
1. Added user's api

Backend:
1. Added unban functional for users

# v1.0.1 (10.02.2022)

## Features:

Frontend:
1. Added role's api
2. Added interfaces for role

# v1.0.0 (10.02.2022)

## Features:

Frontend:
1. Added profile's api
2. Added interfaces for profile

# v0.11.1 (10.02.2022)

## Features:

Frontend:
1. Added post's api.
2. Added interfaces for post 

Backend:
1. Minor fix in posts and profile controllers

# v0.11.0 (8.02.2022)

## Features:

Backend:
1. Added swagger decorator for all endpoints
2. Added swagger configuration

# v0.10.1 (8.02.2022)

## Features:

Frontend:
1. Added registration/login api.
2. Added api instance

# v0.10.0 (8.02.2022)

## Features:

Frontend:
1. Added profile and post page.
2. Added all dependencies

# v0.9.5 (8.02.2022)

## Features:

Frontend:
1. Added signIn/signUp forms
2. Added validators

# v0.9.4 (7.02.2022)

## Features:

Frontend:
1. Added router for frontend

# v0.9.3 (6.02.2022)

## Features:

Backend:
1. Added unfollow functional

# v0.9.2 (6.02.2022)

## Features:

Backend:
1. Added exceptions for follow functional

# v0.9.1 (6.02.2022)

## Fixes:

Backend:
1. Deleted followers from user model
2. Fixed follow functional

# v0.9.0 (2.02.2022)

## Fixes:

Backend:
1. Resolved all issues with post model
2. Fixed some issues

# v0.8.0 (1.02.2022)

## Features:

Backend:
1. Added user's ban functional

# v0.7.9 (1.02.2022)

## Features:

Backend:
1. Added update status functional

## Fixes:

1. Fixed user model (about field)

# v0.7.8 (1.02.2022)

## Features:

Backend:
1. Resolve issues with profile image

2. # v0.7.7 (1.02.2022)

## Features:

Backend:
1. Added activate profile functional

# v0.7.6 (30.01.2022)

## Features:

Backend:
1. Added api property to users 
2. Added prettier

# v0.7.5 (29.01.2022)

## Features:

Backend:
1. Added change status functional

# v0.7.4 (29.01.2022)

## Features:

Backend:
1. Added avatar to user

# v0.7.3 (29.01.2022)

## Fixes:

Backend:
1. Common fixed in models

# v0.7.2 (26.01.2022)

## Features:

1. New main readMe

# v0.7.1 (25.01.2022)

## Features:

Backend:
1. New readMe

# v0.7.0 (25.01.2022)

## Features:

Backend:
1. Added Post module
2. New post dto, and post


# v0.6.0 (25.01.2022)

## Features:

Backend:
1. Added Profile module

## Fixes:

Backend:
1. Updated follow/unfollow models

# v0.5.0 (25.01.2022)

## Features:

Backend:
1. Added File module
2. Added createFile function for get file name from file
3. Added Global validation pipe

## Fixed:

1. Updated and translated some dtos

# v0.4.1 (24.01.2022)

## Fixed:

1. Deleted .ida folder

# v0.4.0 (23.01.2022)

## Features:

Backend:
1. Login functional
2. Validate user function for login

## Fixes:

Backend:
1. Add some status codes
2. Changed user.service test logic

 
# v0.3.3 (22.01.2022)

## Features:

Backend:
1. Added tests for users controller
2. Added tests for users service (not complete)

## Fixes:

Backend:
1. Fixed relation in UserModel

# v0.3.2 (22.01.2022)

## Fixes:

Backend:
1. Resolve issues with relations between users and roles
2. Fixed models (table's tames)


# v0.3.1 (22.01.2022)

## Features:

Backend:
1. Added add role functional
2. Change UserModel

# v0.3.0 (22.01.2022)

## Features:

Backend:
1. New role module
2. Added role/role-module and their relation

## Fixes:

Backend:
1. Change prettier settings


# v0.2.3 (21.01.2022)

## Fixes:

Backend:
1. Deleted img of the database schema

# v0.2.2 (21.01.2022)

## Features:

Backend:
1. Added mail module
2. Added sendActivationLink for activate user's account

# v0.2.1 (21.01.2022)

## Features:

Backend:
1. Added auth module
2. Functionality for registration
3. Jwt-guard for non-authorized users


# v0.2.0 (21.01.2022)

## Features:

Backend:
1. New follow/followers models and their relation


# v0.1.1 (20.01.2022)

## Features:

Backend:
1. Added new models for main user model
2. Added correctly primary and foreign keys

# v0.1.0 (19.01.2022)

## Features:

Backend:
1. Added basic crud structure for users
2. Added complete model for user
3. Validation for create/update user
4. Swagger decorators for users

# v0.0.4 (18.01.2022)

## Features:

Backend:
1. Connected database
2. New .evn for production and development
3. Add all necessary libraries

# v0.0.3  (18.01.2022)

## Features:

Backend:
1. Deleted unnecessary files
2. Prepared code structure for development
