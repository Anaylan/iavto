// import axios from 'app/axios'
import { API_URL } from 'app/config';
import { IRefModel } from 'app/models';
import axiosAuth from 'app/axiosAuth';

export const GET_ALL_CHILD = `${API_URL}/parthnership/getuser`;
export const GET_ALL_COMPANY = `${API_URL}/parthnership/getcompany`;
export const GET_JOINED_REFFERAL_URL = `${API_URL}/parthnership/getamount`;
export const REQUEST_STATS_JOIN_REF = `${API_URL}/parthnership/pageviewed`;
export const REQUEST_STATS_REVIEW_REF = `${API_URL}/parthnership/linktransitions`;

export function getAllReferer() {
  return axiosAuth.get<IRefModel[]>(GET_ALL_CHILD);
}

export function getAllRefCompany() {
  return axiosAuth.get<IRefModel[]>(GET_ALL_COMPANY);
}

// Server should return object => { result: boolean } (Is Email in DB)
export function getJoinedRefs() {
  return axiosAuth.get(GET_JOINED_REFFERAL_URL);
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestAddToStats(id: string | string[] | undefined) {
  return axiosAuth.get(REQUEST_STATS_JOIN_REF, {
    params: {
      id: id,
    },
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestGoToStats() {
  return axiosAuth.get(REQUEST_STATS_REVIEW_REF);
}
