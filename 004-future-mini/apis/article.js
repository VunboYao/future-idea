import http from "./http"

/**
 * 获取文章列表
 * @param {*} data 
 */
export const postArticleList = async function (data = {}) {
  return http('/article/list-page', data)
}

/**
 * 获取文章详情
 * @param {*} data 
 */
export const postArticleDetail = async function (data = {}) {
  return http('/article/detail', data)
}
