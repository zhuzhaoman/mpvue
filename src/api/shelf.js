import { get, post } from './request'

const API_URL = "https://test.youbaobao.xyz:18081"

export function getUserDay (params) {
  return get(`${API_URL}/user/day`, params)
}
