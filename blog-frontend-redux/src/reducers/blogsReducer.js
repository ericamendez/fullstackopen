import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_, action){
      return action.payload
    }
  }
})

export const { setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    console.log(blogs)
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer