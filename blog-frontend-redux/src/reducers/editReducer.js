import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogs'
import { appendBlog } from './blogsReducer'

const editSlice = createSlice({
  name: 'edit',
  initialState: {
    id: '',
    title: '',
    url: '',
    author: '',
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
      }
    }
  }
})

export const { setEdit, resetEdit } = editSlice.actions

export const saveEdit = blog => {
  return async (dispatch, getState) => {
    dispatch(resetEdit())
    const savedBlog = await blogServices.updateBlog(blog)
    dispatch(appendBlog(savedBlog))
  }
}

export default editSlice.reducer