import { all } from "@redux-saga/core/effects";
import { combineReducers } from "@reduxjs/toolkit";
import * as header from "./reducers/authReducer";
import * as region from "./reducers/regionReducer";

export const rootReducer = combineReducers({
    header: header.authReducer,
    region: region.regionReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
    yield all([header.saga(), region.saga()]);
}
