import { API_URL } from 'app/config'
import Axios from 'axios'

const axios = Axios.create({
  baseURL: API_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: false
})
export default axios
