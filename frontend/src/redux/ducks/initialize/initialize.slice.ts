import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface InitializeState {
	initialized: boolean;
	loading: boolean;
	error: any;
}

const initialState: InitializeState = {
	initialized: false,
	loading: false,
	error: null
};
const initializeSlice = createSlice({
	name: "initialize",
	initialState,
	reducers: {
		fetchedInitialize(state) {
			state.loading = true;
		},
		initializeSuccess(state) {
			state.loading = false;
			state.initialized = true;
		},
		initializeFailed(state, action: PayloadAction<any>) {
			state.loading = false;
			state.error = action.payload;
		}
	}
});

export const {
	fetchedInitialize,
	initializeFailed,
	initializeSuccess
} = initializeSlice.actions;

export const initializeReducer = initializeSlice.reducer
