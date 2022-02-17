import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { authReducer } from "./ducks/auth/auth.slice";
import { rootSaga } from "./rootSaga";
import { profileReducer } from "./ducks/profile/profile.slice";
import { postReducer } from "./ducks/post/post.slice";
import { userReducer } from "./ducks/user/user.slice";
import { roleReducer } from "./ducks/role/role.slice";
import { initializeReducer } from "./ducks/initialize/initialize.slice";


const rootReducer = combineReducers({
	authReducer,
	profileReducer,
	postReducer,
	userReducer,
	roleReducer,
	initializeReducer
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const middleware = [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), ...middlewares];

export const store = configureStore({
	devTools: true,
	reducer: rootReducer,
	middleware: middleware
});


sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof store.getState>

