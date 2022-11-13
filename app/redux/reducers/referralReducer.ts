import { put, takeLatest } from '@redux-saga/core/effects';

import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const actionTypes = {
  Add: '[Add Referral] Action',
  Remove: '[Remove Referral] Action',
};

export interface IReferralState {
  ref_code: string | string[] | undefined;
  expired: number | null;
}

const InitialReferralState: IReferralState = {
  ref_code: undefined,
  expired: null,
};

export const actions = {
  addToReferral: (ref_code: string | string[] | undefined) => ({
    type: actionTypes.Add,
    payload: { ref_code },
  }),
  removeFromRefferal: () => ({ type: actionTypes.Remove }),
};

export const referralReducer = persistReducer(
  {
    storage,
    key: 'referral',
    whitelist: ['ref_code', 'expired'],
  },
  (state = InitialReferralState, action: any) => {
    switch (action.type) {
      case actionTypes.Add: {
        const ref_code = action.payload?.ref_code;
        const expired = new Date().getTime() + 10800000;
        return { ref_code, expired };
      }
      case actionTypes.Remove: {
        return InitialReferralState;
      }
      default:
        return state;
    }
  },
);

export function* saga() {
  //   yield takeLatest(actionTypes.Add, function* addSaga() {
  //     yield delay(86400000)
  //     yield put(actions.removeFromRefferal())
  //   })
}
