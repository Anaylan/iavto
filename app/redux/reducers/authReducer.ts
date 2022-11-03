import {UserModel} from "app/models";
import {put, takeLatest} from "@redux-saga/core/effects";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";
import {getUserByToken} from "api/AuthCrud";
import {Action} from "@redux-saga/types";

export const actionTypes = {
    Login: "[Login] Action",
    Logout: "[Logout] Action",
    Register: "[Register] Action",
    UserRequested: "[Request] Action",
}

export interface ActionWithPayload<T> extends Action {
    payload?: T
}

export interface IAuthState {
    title?: string;
}

const InitialAuthState : IAuthState = {
    title: undefined
}

export const actions = {
    login: (title: string) => ({
        type: actionTypes.Login,
        payload: { title},
    }),
    register: (title: string) => ({
        type: actionTypes.Register,
        payload: { title },
    }),
    logout: () => ({ type: actionTypes.Logout }),
    requestUser: () => ({
        type: actionTypes.UserRequested,
    }),
};

// case REHYDRATE:
//     const title = action.payload?.title;
// return { ...state, title  };

export const authReducer = persistReducer(
    {storage, key: 'header', whitelist: ['title']},
    (state: IAuthState = InitialAuthState, action: ActionWithPayload<IAuthState>) => {
        switch (action.type) {
            case actionTypes.Login: {
                const title = action.payload?.title
                return {title}
            }

            case actionTypes.Register: {
                const title = action.payload?.title
                return {title}
            }

            case actionTypes.Logout: {
                return InitialAuthState;
            }

            default:
                return state
        }
    }
)

export function* saga() {
    yield takeLatest(actionTypes.Login, function* loginSaga() {
        yield put(actions.requestUser());
    });

    // yield takeLatest(actionTypes.Register, function* registerSaga() {
    //     yield put(actions.requestUser());
    // });


}
