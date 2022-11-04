import { API_URL } from 'app/config'
import { ICarModel } from 'app/models'
import axios from 'axios'

export const GET_ALL_CARS = `${API_URL}/car/paging`
export const GET_CAR = `${API_URL}/car/one`
export const GET_CARS_FOR_CARPARK = `${API_URL}/car/carpark`

// Server should return AuthModel
export function getCar(id: number) {
  return axios.get<ICarModel>(GET_CAR, {
    params: {
      id
    }
  })
}

export function getCars(from: number, to: number) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<ICarModel[]>(GET_ALL_CARS, {
    params: {
      from,
      to
    }
  })
}

export function getCarsForCarpark(id: number) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.get<ICarModel[]>(GET_CARS_FOR_CARPARK, {
    params: {
      id
    }
  })
}
