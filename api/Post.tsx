// import axios from 'app/axios'
import { API_URL } from 'app/config'
import { IPostModel } from 'app/models'
import axios, { AxiosResponse } from 'axios'

export const GET_ALL_POSTS = `${API_URL}/news/all`
export const GET_LAST_POSTS = `${API_URL}/news/all`
export const GET_POST = `${API_URL}/news/one`

export function getAllPosts() {
  return axios.get<AxiosResponse<IPostModel[]>>(GET_ALL_POSTS)
}

export function getLastPosts() {
  return axios.get<AxiosResponse<IPostModel[]>>(GET_LAST_POSTS)
}

export function getPost(id: number) {
  return axios.get<AxiosResponse<IPostModel[]>>(GET_POST, {
    params: {
      id: id
    }
  })
}
