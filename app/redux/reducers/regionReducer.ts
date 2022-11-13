import { put, takeLatest } from '@redux-saga/core/effects';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const actionTypes = {
  Update: '[Update] Action',
};

export interface IRegionState {
  name: string | undefined;
  id?: number | undefined;
}

const InitialAuthState: IRegionState = {
  name: 'Москва',
  id: 365,
};

export const regionActions = {
  update: (name: string, id: number) => ({
    type: actionTypes.Update,
    payload: { name, id },
  }),
};

export const regionReducer = persistReducer(
  { storage, key: 'location', whitelist: ['id', 'name'] },
  (state = InitialAuthState, action: any) => {
    switch (action.type) {
      case actionTypes.Update: {
        const name = action.payload?.name;
        const id = action.payload?.id;
        return { name, id };
      }

      default:
        return state;
    }
  },
);

export function* saga() {
  yield 0;
}
