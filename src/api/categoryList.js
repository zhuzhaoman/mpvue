import { get, post } from './request'

const API_URL = "https://test.youbaobao.xyz:18081"

/**
 * 获得分类列表
 */
export function categoryList () {
  return get(`${API_URL}/book/category/list/v2`)
}
