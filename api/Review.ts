import { API_URL } from 'app/config';

import axiosAuth from 'app/axiosAuth';
import { IReviewDataModel, IReviewModel } from 'app/models';

export const GET_ALL_REVIEWS = `${API_URL}/reviews/user`;
export const GET_COMPANY_REVIEWS = `${API_URL}/reviews/company`;

// Server should return IReviewMode
export function getUserReviews() {
  return axiosAuth.get<IReviewDataModel[]>(GET_ALL_REVIEWS);
}

export function getCompanyReviews(id: string | string[] | undefined) {
  return axiosAuth.get<IReviewModel>(GET_COMPANY_REVIEWS, {
    params: {
      cid: id,
    },
  });
}
