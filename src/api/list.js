import { get, post } from './request'

const API_URL = "https://test.youbaobao.xyz:18081"

export function searchList (params) {
  return get(`${API_URL}/book/search-list`, params)
}
