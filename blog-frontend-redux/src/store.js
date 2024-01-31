import { configureStore } from '@reduxjs/toolkit'

import blogsReducer from './reducers/blogsReducer'
import editReducer from './reducers/editReducer'
import toggleReducer from './reducers/toggleReducer'
import loginReducer from './reducers/loginReducer'
import createBlogReducer from './reducers/createBlogReducer'

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    edit: editReducer,
    toggle: toggleReducer,
    login: loginReducer,
    createBlog: createBlogReducer
  }
})

export default store