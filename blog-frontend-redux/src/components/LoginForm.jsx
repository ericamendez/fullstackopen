import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleLogin,
  inputChange,
}) => {
  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={inputChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={inputChange}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm
