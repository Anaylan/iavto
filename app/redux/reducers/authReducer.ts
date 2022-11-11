import { put, takeLatest } from '@redux-saga/core/effects'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import { Action } from '@redux-saga/types'
import { UserDataModel } from 'app/models'
import { getUserByToken } from 'api/User'

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request] Action',
  UserLoaded: '[Load User] Auth API',
  SetUser: '[Set User] Action'
}

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export interface IAuthState {
  user?: UserDataModel
  title?: string
}

const InitialAuthState: IAuthState = {
  user: undefined,
  title: undefined
}

export const actions = {
  login: (title: string) => ({
    type: actionTypes.Login,
    payload: { title }
  }),
  register: (title: string) => ({
    type: actionTypes.Register,
    payload: { title }
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: () => ({
    type: actionTypes.UserRequested
  }),
  fulfillUser: (user: UserDataModel) => ({
    type: actionTypes.UserLoaded,
    payload: { user }
  }),
  setUser: (user: UserDataModel) => ({
    type: actionTypes.SetUser,
    payload: { user }
  })
}

export const authReducer = persistReducer(
  { storage, key: 'header', whitelist: ['title', 'user'] },
  (
    state: IAuthState = InitialAuthState,
    action: ActionWithPayload<IAuthState>
  ) => {
    switch (action.type) {
      case actionTypes.Login: {
        const title = action.payload?.title
        return { title }
      }

      case actionTypes.Register: {
        const title = action.payload?.title
        return { title }
      }

      case actionTypes.UserRequested: {
        return { ...state, user: undefined }
      }

      case actionTypes.Logout: {
        return InitialAuthState
      }

      case actionTypes.UserLoaded: {
        const user = action.payload?.user
        return { ...state, user }
      }

      case actionTypes.SetUser: {
        const user = action.payload?.user
        return { ...state, user }
      }

      default:
        return state
    }
  }
)

export function* saga() {
  yield takeLatest(actionTypes.Login, function* loginSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.Register, function* registerSaga() {
    yield put(actions.requestUser())
  })

  yield takeLatest(actionTypes.UserRequested, function* userRequested() {
    const { data } = yield getUserByToken()
    yield put(actions.fulfillUser(data.data))
  })
}
