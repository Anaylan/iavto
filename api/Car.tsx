import axiosAuth from 'app/axiosAuth';
import { API_URL } from 'app/config';
import { ICarModel } from 'app/models';
import axios from 'axios';

export const GET_ALL_CARS = `${API_URL}/car/paging`;
export const GET_CAR = `${API_URL}/car/one`;
export const GET_CARS_FOR_CARPARK = `${API_URL}/car/carpark`;

// Server should return AuthModel
export function getCar(id: number) {
  return axiosAuth.get<ICarModel>(GET_CAR, {
    params: {
      id,
    },
  });
}

export function getCars(from: number, to: number, query: any) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<ICarModel[]>(GET_ALL_CARS, {
    params: {
      from,
      to,
      ...query,
    },
  });
}

// Я просто делами своими тёмными занимаюсь

export function getCarsForCarpark(from: number, to: number, query: any) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<ICarModel[]>(GET_CARS_FOR_CARPARK, {
    params: {
      from,
      to,
      ...query,
    },
  });
}
