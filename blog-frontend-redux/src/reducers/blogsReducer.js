import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(_, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)
    }
  }
})

export const { setBlogs, editBlog, appendBlog, saveEditReducer, likedBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async (dispatch, getState) => {
    const newBlog = await blogServices.createBlog(blog)
    dispatch(appendBlog(newBlog))
  }

}

export const likeBlog = (id, likesObj) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const filtered = blogs.filter((blog) => blog._id === id)

    const likesObject = { ...filtered[0], likes: filtered[0].likes + 1 }

    await blogServices.updateLikes(id, likesObject)

    const newBlogs = blogs.map((blog) =>
      blog._id === id ? likesObject : blog
    )
    dispatch(setBlogs(newBlogs))
  }
}

export const handleDelete = id => {
  return async (dispatch, getState) => {
    if (!window.confirm('Are you sure you want to delete')) {
      return
    }

    const blogs = getState().blogs

    const updatedBlogs = blogs.filter((blog) => blog._id !== id)

    await blogServices.deleteBlog(id)

    dispatch(setBlogs(updatedBlogs))
  }
}

export default blogSlice.reducer