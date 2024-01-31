import { createSlice, current } from '@reduxjs/toolkit'

const toggleSlice = createSlice({
  name: 'toggle',
  initialState: {
    showMoreBlog: [],
  },
  reducers: {
    toggleShowMoreBlog(state, action) {
      console.log(action.payload, current(state), 'updating')

      if (state.showMoreBlog.includes(action.payload)) {
        const index = state.showMoreBlog.indexOf(action.payload)
        state.showMoreBlog.splice(index, 1)
      } else {
        state.showMoreBlog.push(action.payload)
      }
    }
  }
})

export const { toggleShowMoreBlog } = toggleSlice.actions

export default toggleSlice.reducer