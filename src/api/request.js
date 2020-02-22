function createFly () {
  if (mpvuePlatform === 'wx') {
    const Fly = require('flyio/dist/npm/wx')
    return new Fly()
  } else {
    return null
  }
}

export function get (url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.get(url, params).then(response =>{
        if (response.data.error_code === 0){
          resolve(response)
        }else{
          mpvue.showToast({
            title: '网络请求异常',
            icon: 'none',
            duration: 2000
          })
          reject(err)
        }
      }).catch(err => {
        mpvue.showToast({
          title: '网络请求异常',
          icon: 'none',
          duration: 2000
        })
        reject(err)
      })
    })
  }
}

export function post (url, params = {}) {
  const fly = createFly()
  if (fly) {
    return new Promise((resolve, reject) => {
      fly.post(url, params).then(response => {
        if (response.data.error_code === 0){
          resolve(response)
        }else{
          mpvue.showToast({
            title: '网络请求异常',
            icon: 'none',
            duration: 2000
          })
          reject(err)
        }
      }).catch(err => {
        mpvue.showToast({
          title: '网络请求异常',
          icon: 'none',
          duration: 2000
        })
        reject(err)
      })
    })
  }
}
