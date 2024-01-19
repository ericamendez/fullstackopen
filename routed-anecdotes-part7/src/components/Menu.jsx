import { Link } from "react-router-dom";

const Menu = ({ user }) => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link to="/" style={padding}>
        anecdotes
      </Link>
      <Link to="/createNew" style={padding}>
        create new
      </Link>
      <Link to="/about" style={padding}>
        about
      </Link>
      <Link to="/users" style={padding}>users</Link>
      {user ? (
        <em>{user} logged in</em>
      ) : (
        <Link style={padding} to="/login">
          login
        </Link>
      )}
    </div>
  );
};

export default Menu;
