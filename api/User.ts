import axiosAuth from 'app/axiosAuth';
import { API_URL, URL_IMG } from 'app/config';
import { UserModel } from 'app/models';
import { IFavoritesModel } from 'app/models/favorite/Favorites';
import axios from 'axios';
// auth
export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/auth/token`;
export const LOGIN_URL = `${API_URL}/auth`;
export const REGISTER_URL = `${API_URL}/auth/new`;
export const REQUEST_RESTORE_CODE_URL = `${API_URL}/auth/resetpassword`;
export const REQUEST_RESTORE_PASSWORD_URL = `${API_URL}/auth/resetpassword/getcode`;
export const REQUEST_PASSWORD_URL = `${API_URL}/auth/resetpassword/getnewpassword`;

// edit
export const REQUEST_VERIFICATION_URL = `${API_URL}/user/verification`;
export const REQUEST_EDIT_URL = `${API_URL}/user/edit`;

// favorite
export const REQUEST_TO_FAVOR = `${API_URL}/user/addfavorites`;
export const GET_FAVOR = `${API_URL}/user/getfavorites`;
export const REMOVE_FAVOR = `${API_URL}/user/delfavorites`;
export const GET_FAVOR_COUNT = `${API_URL}/user/favorites`;

// count
export const GET_COMPANIES_COUNT = `${API_URL}/user/getcountfavoritescarpark`;
export const GET_CARS_COUNT = `${API_URL}/user/getcountfavoritescar`;
export const GET_ORDERS_COUNT = `${API_URL}/user/getcountorder`;
export const GET_REVIEWS_COUNT = `${API_URL}/user/getcountreviews`;
export const GET_SUCCES_ORDERS_COUNT = `${API_URL}/user/orders`;

// image
export const REQUEST_IMG_URL = `${URL_IMG}/image/download/user`;

// Server should return AuthModel
export async function login(email: string, password: string) {
  return await axiosAuth.post(LOGIN_URL, { email, password });
}

// Server should return AuthModel
export function register(
  email: string,
  password: string,
  firstname: string,
  lastname: string,
  phone: string,
  ref_code: string | string[] | undefined,
) {
  return axiosAuth.post<UserModel>(REGISTER_URL, {
    email,
    password,
    firstname,
    lastname,
    phone,
    ref_code,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestCode(email: string) {
  return axiosAuth.get(REQUEST_RESTORE_CODE_URL, { params: { email } });
}

export async function getUserByToken() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axiosAuth.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL);
}

export async function requestPassword(token: string, code: string) {
  return axios.get<UserModel>(REQUEST_RESTORE_PASSWORD_URL, {
    params: {
      token,
      code,
    },
  });
}

export async function requestNewPassword(
  token: string,
  code: string,
  password: string,
) {
  return axios.get<UserModel>(REQUEST_PASSWORD_URL, {
    params: {
      token,
      code,
      password,
    },
  });
}

export async function requestVerification(options: any) {
  return axiosAuth.post<UserModel>(REQUEST_VERIFICATION_URL, options);
}

export async function requestEdit(options: any) {
  return axiosAuth.post<UserModel>(REQUEST_EDIT_URL, options);
}

export function requestAddToFavor(id: number) {
  return axiosAuth.get<IFavoritesModel>(REQUEST_TO_FAVOR, {
    params: {
      id_content: id,
    },
  });
}

export function getUserFavor() {
  return axiosAuth.get<IFavoritesModel>(GET_FAVOR);
}

export function getCompaniesCount() {
  return axiosAuth.get<number>(GET_COMPANIES_COUNT);
}

export function getCarsCount() {
  return axiosAuth.get<number>(GET_CARS_COUNT);
}

export function getOrdersCount() {
  return axiosAuth.get<number>(GET_ORDERS_COUNT);
}

export function getReviewsCount() {
  return axiosAuth.get<number>(GET_REVIEWS_COUNT);
}

export async function requestSendImg(options: any) {
  return axiosAuth.post(REQUEST_IMG_URL, options, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

export function requestDelFromFavor(id: number) {
  return axiosAuth.get<IFavoritesModel>(REMOVE_FAVOR, {
    params: {
      id_content: id,
    },
  });
}

export function getSuccessOrdersCount() {
  return axiosAuth.get(GET_SUCCES_ORDERS_COUNT);
}

export function getFavoriteCount() {
  return axiosAuth.get(GET_FAVOR_COUNT);
}