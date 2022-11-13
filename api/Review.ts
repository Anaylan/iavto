import { API_URL } from 'app/config';

import axiosAuth from 'app/axiosAuth';
import { IReviewModel } from 'app/models';

export const GET_ALL_REVIEWS = `${API_URL}/reviews/user`;
export const GET_PRODUCT_REVIEWS = `${API_URL}/reviews/product`;

// Server should return IReviewMode
export function getUserReviews() {
  return axiosAuth.get<IReviewModel[]>(GET_ALL_REVIEWS);
}

export function getCarReviews(id: string | string[] | undefined) {
  return axiosAuth.get<IReviewModel[]>(GET_PRODUCT_REVIEWS, {
    params: {
      pid: id,
    },
  });
}
