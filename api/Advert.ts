import axios from 'axios';
import { API_URL } from 'app/config';
import { IPlaces, IAdModel } from 'app/models';

export const GET_ADVERT = `${API_URL}/advertisment`;
export const CLICK_ADVERT = `${API_URL}/advertisment/click`;
export const VIEW_ADVERT = `${API_URL}/advertisment/view`;

export function getAdvertisment(type: IPlaces) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<IAdModel[]>(GET_ADVERT, {
    params: { type: IPlaces[type] },
  });
}

export function viewAdvertisment(id: number) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<IAdModel[]>(VIEW_ADVERT, {
    params: { id },
  });
}

export function clickAdvertisment(id: number) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<IAdModel[]>(CLICK_ADVERT, {
    params: { id },
  });
}
