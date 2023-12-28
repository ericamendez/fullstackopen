const Login = ({ user, handleLogout }) => {
  return (
    <div>
      <p>
        {user} is logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  );
};

export default Login;
