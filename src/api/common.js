import { getUserOpenId } from './index'

/**
 * 用户授权
 * @param auth
 * @param onSuccess
 * @param onFail
 */
export function getSetting(auth, onSuccess, onFail) {
  mpvue.getSetting({
    success: res => {
      if(res.authSetting[`scope.${auth}`]){
        onSuccess(res)
      }else{
        onFail(res)
      }
    },
    fail: err => {

    }
  })
}

/**
 * 获取用户信息
 * @param onSuccess
 * @param OnFail
 */
export function getUserInfo (onSuccess, onFail) {
  mpvue.getUserInfo({
    success: res => {
      if (res.userInfo){
        onSuccess(res.userInfo)
      }else {
        onFail(res)
      }
    },
    fail: err => {
      onFail(err)
    }
  })
}

/**
 * 缓存数据
 * @param key
 * @param value
 */
export function setStorageSync (key, value) {
  mpvue.setStorageSync( key, value)
}

/**
 * 获取缓存
 * @param key
 */
export function getStorageSync (key) {
  return mpvue.getStorageSync(key)
}

export function getOpenId (onSuccess) {
  mpvue.login({
    success: res => {
      if (res.code){
        getUserOpenId(res.code).then(res => {
          onSuccess(res.data.data.openid)
        }).catch(err => {
          console.log(err)
        })
      }else{
        console.log(res)
      }
    },
    fail: err => {
      console.log(err)
    }
  })
}

/**
 * 设置页面标题栏文字
 * @param title
 */
export function setNavigationBarTitle (title) {
  mpvue.setNavigationBarTitle({title})
}
