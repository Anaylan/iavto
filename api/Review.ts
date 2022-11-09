import { API_URL } from 'app/config'

import axios from 'axios'
import { IReviewModel } from 'app/models'
export const GET_ALL_REVIEWS = `${API_URL}/reviews/all`

// Server should return AuthModel
export function getAllReviews() {
  return axios.get<IReviewModel[]>(GET_ALL_REVIEWS)
  // return [
  //   {
  //     id: '1',
  //     cid: '1',
  //     uid: '1',
  //     mark: 'Kia',
  //     model: 'Optima',
  //     year: '2010',
  //     carpark: 'АвтоПрофи',
  //     price: '1200',
  //     date: '7 Ноября 2022',
  //     raiting: '3',
  //     img: '/media/carpark-intro.jpg',
  //     description: 'Отличный автомобиль.'
  //   },
  //   {
  //     id: '2',
  //     cid: '2',
  //     uid: '2',
  //     mark: 'Kia',
  //     model: 'Ceranto',
  //     year: '2020',
  //     carpark: 'Быстрее Ветра',
  //     price: '800',
  //     date: '5 Октября 2022',
  //     raiting: '1',
  //     img: '/media/carpark.png',
  //     description: 'Плохой сервис'
  //   },
  //   {
  //     id: '3',
  //     cid: '2',
  //     uid: '3',
  //     mark: 'Kia',
  //     model: 'Rio',
  //     year: '2015',
  //     carpark: 'Быстрее Ветра',
  //     price: '2100',
  //     date: '3 Августа 2021',
  //     raiting: '3',
  //     img: '/media/taxi.png',
  //     description: 'Низкое качество'
  //   }
  // ]
}
