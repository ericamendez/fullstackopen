import { configureStore } from '@reduxjs/toolkit'

import blogsReducer from './reducers/blogsReducer'
import editReducer from './reducers/editReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    edit: editReducer
  }
})

export default store