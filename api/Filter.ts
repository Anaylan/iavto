import { API_URL } from 'app/config';
import axios from 'axios';

export const GET_CAR_FILTER = `${API_URL}/car/filter`;
export const GET_CAR_TARIFS = `${API_URL}/car/tarif`;

// Server should return AuthModel
export function getCarFilters(options: any, city_id: any) {
  return axios.get(`${GET_CAR_FILTER}/${city_id}`, {
    params: options,
  });
}

// Server should return AuthModel
export function getCarTarifs(city_id: any) {
  return axios.get(`${GET_CAR_TARIFS}/${city_id}`);
}

//
