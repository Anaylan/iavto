import { API_URL } from 'app/config';
import axios from 'axios';

export const REQUEST_FEEDBACK = `${API_URL}/feedback`;
export const REQUEST_INVESTOR = `${API_URL}/investor`;

export function requestFeedback(options: any) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.post(REQUEST_FEEDBACK, { ...options });
}

export function requestInvestor(options: any) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axios.post(REQUEST_INVESTOR, { ...options });
}
