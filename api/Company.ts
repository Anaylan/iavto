import { API_URL } from 'app/config';
import { ICarparkModel } from 'app/models';
import axios from 'axios';

export const GET_HOTTENDER_PARK = `${API_URL}/carpark/getHotTender`;
export const GET_LASTENDER_PARK = `${API_URL}/carpark/getLastTender`;
export const GET_ALL_CARPARK = `${API_URL}/carpark/all`;
export const GET_CARPARK = `${API_URL}/carpark/one`;

export function getHotTender() {
  return axios.get<ICarparkModel>(GET_HOTTENDER_PARK);
}

export function getLastTender() {
  return axios.get<ICarparkModel>(GET_LASTENDER_PARK);
}

export function getAllCarparks() {
  return axios.get<ICarparkModel>(GET_ALL_CARPARK);
}

export function getCarpark(id: number | undefined) {
  return axios.get<ICarparkModel>(GET_CARPARK, {
    params: {
      cid: id,
    },
  });
}
