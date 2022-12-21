import axiosAuth from 'app/axiosAuth';
import { API_URL } from 'app/config';

export const REQUEST_FEEDBACK = `${API_URL}/partner/read`;

export function getPartners(type: number) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axiosAuth.get(REQUEST_FEEDBACK, { params: {type: type} });
}