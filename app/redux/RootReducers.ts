import { all } from '@redux-saga/core/effects';
import { combineReducers } from '@reduxjs/toolkit';
import * as header from './reducers/authReducer';
import * as region from './reducers/regionReducer';
import * as referral from './reducers/referralReducer';

export const rootReducer = combineReducers({
  header: header.authReducer,
  region: region.regionReducer,
  referral: referral.referralReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export function* rootSaga() {
  yield all([header.saga(), referral.saga()]);
}
