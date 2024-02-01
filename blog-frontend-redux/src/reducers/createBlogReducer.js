import { createSlice } from '@reduxjs/toolkit'

const createBlogSlice = createSlice({
  name: 'createBlog',
  initialState: {
    title: '',
    author: '',
    url: '',
    likes: 0,
    userId: null,
  }, reducers: {
    setCreateBlog(state, action) {
      return action.payload
    },
    resetCreateBlog() {
      return {
        title: '',
        author: '',
        url: '',
        likes: 0,
        userId: null,
      }
    }
  }
})

export const { setCreateBlog, resetCreateBlog } = createBlogSlice.actions

export default createBlogSlice.reducer