import axiosAuth from 'app/axiosAuth'
import { API_URL } from 'app/config'
import { UserModel } from 'app/models'

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/token`
export const LOGIN_URL = `${API_URL}/auth`
export const REGISTER_URL = `${API_URL}/auth/new`
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/forgot-password`

// Server should return AuthModel
export async function login(email: string, password: string) {
  return await axiosAuth.post(LOGIN_URL, { email, password })
}

// Server should return AuthModel
export function register(
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  phone: string
) {
  return axiosAuth.post<UserModel>(REGISTER_URL, {
    email,
    password,
    firstname,
    lastname,
    phone
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axiosAuth.post<{ result: boolean }>(REQUEST_PASSWORD_URL, { email })
}

export async function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  console.log(axiosAuth.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL))
  return axiosAuth.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL)
}

export async function reset(email: string) {
  return { data: 'отправил' }
}
