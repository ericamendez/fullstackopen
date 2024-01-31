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

function App() {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleInputChanges = (e) => {
    switch (e.target.name) {
    case 'title':
      setTitle(e.target.value)
      break
    case 'url':
      setUrl(e.target.value)
      break
    case 'author':
      setAuthor(e.target.value)
      break
    case 'username':
      setUsername(e.target.value)
      break
    case 'password':
      setPassword(e.target.value)
      break
    default:
      console.log('Something else changed')
    }
  }

  const handleFormSubmit = (e) => {
    const newBlog = {
      title,
      url,
      author,
      likes: 0,
      userId: user.id,
    }

    const addBlog = async () => {
      const returnedBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(returnedBlog))
    }

    try {
      addBlog()
    } catch (err) {
      console.log(err)
    }

    console.log('Form submitted')
  }

  const handleDelete = async (e) => {
    if (!window.confirm('Are you sure you want to delete')) {
      return
    }

    const id = e.target.getAttribute('value')

    const updatedBlogs = blogs.filter((blog) => blog._id !== id)

    await blogService.deleteBlog(id)

    setBlogs(updatedBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username,
        password,
      })

      console.log(user)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      setTimeout(() => {
        console.log(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setLoginVisible(false)
  }

  const handleShowLogin = () => {
    setLoginVisible(!loginVisible)
  }

  return (
    <div>
      {user === null ? (
        <Togglable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            inputChange={handleInputChanges}
            user={user}
          />
        </Togglable>
      ) : (
        <div>
          <Login user={user.name} handleLogout={handleLogout} />
          <Togglable buttonLabel="add blog">
            <BlogForm
              inputChange={handleInputChanges}
              submit={handleFormSubmit}
            />
          </Togglable>
        </div>
      )}
      <Blogs
        handleDelete={handleDelete}
        user={user}
      />
    </div>
  )
}

export default App
