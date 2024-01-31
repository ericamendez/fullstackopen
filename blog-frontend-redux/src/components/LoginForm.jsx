import PropTypes from 'prop-types'
import { useFieldLogin } from '../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { saveLogin, logout } from '../reducers/loginReducer'


const LoginForm = () => {
  const user = useSelector((state) => state.login.user)
  const dispatch = useDispatch()
  const username = useFieldLogin('text', 'username')
  const password = useFieldLogin('password', 'password')

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch(saveLogin())
  }

  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              name="username"
              {...username}
            />
          </div>
          <div>
            password
            <input
              id="password"
              name="password"
              {...password}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
