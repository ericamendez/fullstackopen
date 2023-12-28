const LoginForm = ({
  username,
  password,
  handleLogin,
  inputChange,
  loginVisible,
  handleShowLogin,
}) => {
  const showLogin = { display: loginVisible ? "" : "none" };
  const hideLogin = { display: loginVisible ? "none" : "" };
  return (
    <div>
      <button onClick={handleShowLogin} style={hideLogin}>
        Login
      </button>
      <div style={showLogin}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="username"
              onChange={inputChange}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="password"
              onChange={inputChange}
            />
          </div>
          <button type="submit">login</button>
        </form>
        <button onClick={handleShowLogin}>cancel</button>
      </div>
    </div>
  );
};

export default LoginForm;
