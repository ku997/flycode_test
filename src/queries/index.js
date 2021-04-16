const axios = require("axios");

export function registration(email, password) {
  return axios.request({
    url: '/register',
    method: "POST",
    baseURL: "https://reqres.in/api/",
    responseType: "json",
    data: { email, password },
  });
}
export function login(email, password) {
  return axios.request({
    url: '/login',
    method: "POST",
    baseURL: "https://reqres.in/api/",
    responseType: "json",
    data: { email, password },
  });
}
export function getPostsQuery() {
  return axios.request({
    url: '/posts',
    method: "GET",
    baseURL: "https://jsonplaceholder.typicode.com/",
    responseType: "json",
  });
}
export function getSinglePostsQuery(postId) {
  return axios.request({
    url: `/posts/${postId}`,
    method: "GET",
    baseURL: "https://jsonplaceholder.typicode.com/",
    responseType: "json",
  });
}
export function editPostQuery (postId, title, body) {
  return axios.request({
    url: `/posts/${postId}`,
    method: "PATCH",
    baseURL: "https://jsonplaceholder.typicode.com/",
    responseType: "json",
    data: {title, body}
  });
}
export function deletePostQuery (postId) {
  return axios.request({
    url: `/posts/${postId}`,
    method: "delete",
    baseURL: "https://jsonplaceholder.typicode.com/",
    responseType: "json",
  });
}
export function createPostQuery (userId, title, body) {
  return axios.request({
    url: `/posts`,
    method: "POST",
    baseURL: "https://jsonplaceholder.typicode.com/",
    responseType: "json",
    data: {userId, title, body}
  });
}