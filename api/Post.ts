// import axios from 'app/axios'
import { API_URL } from 'app/config';
import { IPostModel } from 'app/models';
import axios from 'axios';

export const GET_ALL_POSTS = `${API_URL}/news/all`;
export const GET_LAST_POSTS = `${API_URL}/news/all`;
export const GET_POST = `${API_URL}/news/one`;
export const REQUEST_POST_VIEW = `${API_URL}/news/view`;

export function getAllPosts() {
  return axios.get<IPostModel[]>(GET_ALL_POSTS);
}

export function getLastPosts() {
  return axios.get<IPostModel[]>(GET_LAST_POSTS);
}

export function getPost(id: number) {
  return axios.get<IPostModel[]>(GET_POST, {
    params: {
      id: id,
    },
  });
}

export function requestViewPost(id: number) {
  return axios.get(REQUEST_POST_VIEW, {
    params: {
      id: id,
    },
  });
}
