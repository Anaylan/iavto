// import axios from 'app/axios'
import { API_URL } from 'app/config';
import { IRefModel } from 'app/models';
import axiosAuth from 'app/axiosAuth';

export const GET_ALL_CHILD = `${API_URL}/parthnership/getuser`;
export const GET_ALL_COMPANY = `${API_URL}/parthnership/getcompany`;

export function getAllReferer() {
  return axiosAuth.get<IRefModel[]>(GET_ALL_CHILD);
}

export function getAllRefCompany() {
  return axiosAuth.get<IRefModel[]>(GET_ALL_COMPANY);
}
