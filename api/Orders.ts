import axiosAuth from 'app/axiosAuth';
import { API_URL } from 'app/config';
import { IOrderModel } from 'app/models';

export const GET_USER_ORDERS = `${API_URL}/order/user`;
export const GET_ORDER_CANCEL = `${API_URL}/order/cancel`;
export const SET_ORDER_TIME = `${API_URL}/order/set_time`;

// Server should return AuthModel
export async function getUserOrders(options: any) {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axiosAuth.get<IOrderModel[]>(GET_USER_ORDERS, { params: options });
}

export async function orderCancel(id: number) {
  return axiosAuth.get(GET_ORDER_CANCEL, { params: { id: id } });
}

export async function orderTime(id: number, time: string) {
  return axiosAuth.post(SET_ORDER_TIME, JSON.stringify({ id: id, time: time }));
}
