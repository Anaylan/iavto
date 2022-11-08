import { API_URL } from 'app/config'
import { ICarModel } from 'app/models'
import axios from 'axios'

export const GET_CAR_FILTER = `${API_URL}/car/filter`

// Server should return AuthModel
export function getCarFilters(options: any) {
  return axios.get(GET_CAR_FILTER, {
    params: options
  })
}
