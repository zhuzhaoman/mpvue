import { get, post } from './request'

const API_URL = "https://test.youbaobao.xyz:18081"

/**
 * 获得图书详情
 */
export function bookDetail (params) {
  return get(`${API_URL}/book/detail`, params)
}

/**
 * 图书评分
 */
export function bookRankSave (params) {
  return get(`${API_URL}/book/rank/save`, params)
}

/**
 * 获取图书内容
 */
export function bookContents (params) {
  return get(`${API_URL}/book/contents`, params)
}

/**
 * 判断图书是否在书架上
 */
export function bookIsInShelf (params) {
  return get(`${API_URL}/book/shelf/get`, params)
}

/**
 * 加入书架
 */
export function bookShelfSave (params) {
  return get(`${API_URL}/book/shelf/save`, {shelf: JSON.stringify(params)})
}

/**
 * 移除书架
 */
export function bookShelfRemove (params) {
  return get(`${API_URL}/book/shelf/remove`, {shelf: JSON.stringify(params)})
}
