import axios from "axios";
const baseURL = "/api/blogs";

const getAll = async () => {
  const request = await axios.get(baseURL);
  return request.data;
}

const createBlog = async (newObject) => {
  const response = await axios.post(baseURL, newObject);
  return response.data;
}

export default { getAll, createBlog };