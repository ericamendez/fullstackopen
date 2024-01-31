import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setLogin } from '../reducers/loginReducer'
import blogService from '../services/blogs'


const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.user)
  const login = useSelector((state) => state.login)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin({ ...login, user }))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(logout())
  }

  return (
    <div className="logged-in">
      <p>
        {user.name} is logged in <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  )
}

export default Login
