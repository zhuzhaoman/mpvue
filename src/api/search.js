import { get, post } from './request'

const API_URL = "https://test.youbaobao.xyz:18081"

/**
 * 搜索
 * @param params
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function search (params) {
  return get(`${API_URL}/book/search`, params)
}

/**
 * 获得热搜词
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function hotSearch () {
  return get(`${API_URL}/book/hot-search`)
}
