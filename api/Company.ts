import { API_URL } from 'app/config';
import { ICarparkModel } from 'app/models';
import axios from 'axios';
import axiosAuth from 'app/axiosAuth';

export const GET_HOTTENDER_PARK = `${API_URL}/carpark/getHotTender`;
export const GET_LASTENDER_PARK = `${API_URL}/carpark/getLastTender`;
export const GET_NEW_PARK = `${API_URL}/carpark/newParks`;
export const GET_ALL_CARPARK = `${API_URL}/carpark/all`;
export const GET_CARPARK = `${API_URL}/carpark/one`;
export const REQUEST_VISIT = `${API_URL}/car/view`;

export function getHotTender() {
  return axiosAuth.get<ICarparkModel>(GET_HOTTENDER_PARK);
}

export function getLastTender() {
  return axiosAuth.get<ICarparkModel>(GET_LASTENDER_PARK);
}

export function getAllCarparks() {
  return axiosAuth.get<ICarparkModel>(GET_ALL_CARPARK);
}

export function getCarpark(id: number | undefined) {
  return axiosAuth.get<ICarparkModel>(GET_CARPARK, {
    params: {
      cid: id,
    },
  });
}

export function requestVisit(id: number | undefined) {
  return axios.get<ICarparkModel>(REQUEST_VISIT, {
    params: {
      id: id,
    },
  });
}

export function getNewCarpark() {
  return axiosAuth.get<ICarparkModel>(GET_NEW_PARK);
}