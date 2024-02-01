import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, setLogin } from '../reducers/loginReducer'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login.user)

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
