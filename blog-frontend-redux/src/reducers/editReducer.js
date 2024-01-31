import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import { saveEditReducer, setBlogs } from './blogsReducer'

const editSlice = createSlice({
  name: 'edit',
  initialState: {
    id: '',
    title: '',
    url: '',
    author: '',
    likes: null,
  },
  reducers: {
    setEdit(_, action){
      return action.payload
    },
    resetEdit(){
      return {
        id: '',
        title: '',
        url: '',
        author: '',
        likes: null,
      }
    }
  }
})

export const { setEdit, resetEdit } = editSlice.actions

export const saveEdit = blog => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs

    const filtered = blogs.filter(b => b._id === blog.id)
    const updatedBlog = { ...filtered[0], title: blog.title, author: blog.author, url: blog.url }

    const newState = blogs.map(b => b._id === blog.id ? updatedBlog : b)
    await blogServices.updateBlog(blog.id, updatedBlog)

    dispatch(setBlogs(newState))
    dispatch(resetEdit())
  }
}

export default editSlice.reducer