import axios from 'axios'
const baseURL = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseURL)
  return request.data
}

const updateBlog = async (id, newObject) => {
  const request = await axios.put(`${baseURL}/${id}`, newObject)
  return request.data
}

const likeBlog = async (id, likes) => {
  const request = await axios.put(`${baseURL}/likes/${id}`, likes)
  return request.data
}

const createBlog = async (newObject) => {
  const config = {
    credentials: 'include',
    headers: { authorization: token },
  }

  const request = await axios.post(baseURL, newObject, config)
  return request.data
}

const deleteBlog = async (id) => {
  const config = {
    credentials: 'include',
    headers: { authorization: token },
  }

  const request = axios.delete(`${baseURL}/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, createBlog, updateBlog, likeBlog, deleteBlog, setToken }