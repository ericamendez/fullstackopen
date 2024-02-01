import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Login from './components/Login'
import Togglable from './components/Togglable'
import './App.css'

import { initializeBlogs } from './reducers/blogsReducer'
import { setLogin } from './reducers/loginReducer'
import blogService from './services/blogs'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const user = useSelector((state) => state.login.user)
  const login = useSelector((state) => state.login)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const userObj = JSON.parse(loggedUserJSON)
      dispatch(setLogin({ ...login, user: userObj }))
      blogService.setToken(userObj.token)
    }
  }, [])

  return (
    <div>
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm />
        </Togglable>
      ) : (
        <div>
          <Login />
          <Togglable buttonLabel="add blog">
            <BlogForm />
          </Togglable>
        </div>
      )}
      <Blogs />
    </div>
  )
}

export default App
