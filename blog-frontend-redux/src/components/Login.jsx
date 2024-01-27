const Login = ({ user, handleLogout }) => {
  return (
    <div className="logged-in">
      <p>
        {user} is logged in <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  )
}

export default Login
