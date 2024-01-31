import { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BlogForm from './components/BlogForm'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Login from './components/Login'
import Togglable from './components/Togglable'
import './App.css'

import blogService from './services/blogs'
import loginService from './services/login'
import { initializeBlogs } from './reducers/blogsReducer'
import { setLogin } from './reducers/loginReducer'

function App() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)

  const user = useSelector((state) => state.login.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleShowLogin = () => {
    setLoginVisible(!loginVisible)
  }

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
