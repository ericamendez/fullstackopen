import axios from "axios";
const baseURL = "/api/blogs";

const getAll = async () => {
  const request = await axios.get(baseURL);
  return request.data;
}

const getBlog = async () => {

}

const updateBlog = async (id, newObject) => {
    const request = await axios.put(`${baseURL}/${id}`, newObject)
    return request.data;
}

const likeBlog = async () => {

}

const createBlog = async (newObject) => {
  const request = await axios.post(baseURL, newObject);
  return request.data;
}

export default { getAll, createBlog, updateBlog };