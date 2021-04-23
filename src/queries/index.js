import reqresApi from '../reqresApi'
import jsonplaceholderApi from '../jsonplaceholderApi'

export function registration (email, password) {
  return reqresApi.post('/register', { email, password })
}
export function login (email, password) {
  return reqresApi.post('/login', { email, password })
}
export function getUsersQuery (page) {
  return reqresApi.get(`/users?page=${page}`)
}

export function getPostsQuery() {
  return jsonplaceholderApi.get('/posts')
}
export function getSinglePostsQuery(postId) {
  return jsonplaceholderApi.get(`/posts/${postId}`)
}
export function editPostQuery (postId, title, body) {
  return jsonplaceholderApi.patch(`/posts/${postId}`, {title, body})
}
export function deletePostQuery (postId) {
  return jsonplaceholderApi.delete(`/posts/${postId}`)
}
export function createPostQuery (userId, title, body) {
  return jsonplaceholderApi.post('/posts', {userId, title, body})
}