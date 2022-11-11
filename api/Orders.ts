import axiosAuth from 'app/axiosAuth'
import { API_URL } from 'app/config'
import { IOrderModel } from 'app/models'

export const GET_USER_ORDERS = `${API_URL}/order/user`

// Server should return AuthModel
export async function getUserOrders() {
  // Authorization head should be fulfilled in interceptor.
  // Check common redux folder => setupAxios
  return axiosAuth.get<IOrderModel[]>(GET_USER_ORDERS)
}
