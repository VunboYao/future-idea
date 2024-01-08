const BASE_URL = 'https://www.vunbo.com/api'

const http = (url, data, options = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${BASE_URL}${url}`,
      method: 'POST',
      data,
      header: {
        'content-type': 'application/json',
        ...options
      },
      success(res) {
        resolve(res.data)
      },
      fail(err) {
        console.log(err, 'HTTP ERROR');
        reject(err)
      }
    })
  })
}


export default http
