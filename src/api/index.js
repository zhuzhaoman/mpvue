import { get, post } from './request'

const API_URL = "https://test.youbaobao.xyz:18081"
const APP_ID = "wxb8d4d0af53546672"
const App_SECRET = "05030133f12577d38ef4bfccdebd8a14"

/**
 * 获得首页数据
 */
export function getHomeData (params) {
  return get(`${API_URL}/book/home/v2`, params)
}

/**
 * 为你推荐数据
 */
export function recommend () {
  return get(`${API_URL}/book/home/recommend/v2`)
}

/**
 * 为你推荐数据
 */
export function freeRead () {
  return get(`${API_URL}/book/home/freeRead/v2`)
}

/**
 * 为你推荐数据
 */
export function hotBook () {
  return get(`${API_URL}/book/home/hotBook/v2`)
}

/**
 * 网络请求，获取openid
 * @param code
 * @returns {Promise | Promise<unknown> | undefined}
 */
export function getUserOpenId (code) {
  return get(`${API_URL}/openId/get`, {
    appId: APP_ID,
    secret: App_SECRET,
    code: code
  })
}

/**
 * 用户注册
 */
export function register (openid, userInfo) {
  post(`${API_URL}/user/register`, {
    openId: openid,
    platform: mpvuePlatform,
    ...userInfo
  })
}
