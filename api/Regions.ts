import { API_URL } from 'app/config'

import axios, { AxiosResponse } from 'axios'

import { UserLocation } from 'app/models'
const REGION_API = 'https://api.sypexgeo.net'

export const NAME_URL = `${REGION_API}/json`
export const ID_URL = `${API_URL}/user/getIdCity`
export const REQUEST_LOCATIONS_URL = `${API_URL}/location/all`
export const REQUEST_LOCATION_URL = `${API_URL}/location/get`

// Server should return AuthModel
export function getNameLocation() {
  return axios.get(NAME_URL, {
    withCredentials: false
  })
}

export function getAllLocations() {
  return axios.get<AxiosResponse<UserLocation[]>>(REQUEST_LOCATIONS_URL)
}

export function getLocation() {
  return axios.get<AxiosResponse<UserLocation>>(REQUEST_LOCATION_URL)
}
