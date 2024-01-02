import { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Login from "./components/Login";
import Toggable from "./components/Toggable";

import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    };

    try {
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleInputChanges = (e) => {
    switch (e.target.name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "url":
        setUrl(e.target.value);
        break;
      case "author":
        setAuthor(e.target.value);
        break;
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        console.log("Something else changed");
    }
  };

  const handleFormSubmit = (e) => {
    const newBlog = {
      title,
      url,
      author,
      likes: 0,
      userId: user.id,
    };

    const addBlog = async () => {
      const returnedBlog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(returnedBlog));
    };

    try {
      addBlog();
    } catch (err) {
      console.log(err);
    }

    console.log("Form submitted");
  };

  const handleEdit = (e) => {
    const id = e.target.getAttribute("value");
    const eTitle = e.target.getAttribute("title")
    const eUrl = e.target.getAttribute("url")
    const eAuthor = e.target.getAttribute("author")

    setIsEdit(!isEdit);
    setEditID(id);
    setTitle(eTitle);
    setUrl(eUrl);
    setAuthor(eAuthor);
  };

  const handleEditSave = async () => {
    console.log("saved");
    setIsEdit(!isEdit);

    const filtered = blogs.filter((blog) => blog._id === editID);
    const updatedBlog = { ...filtered[0], title, url, author };

    const updatedBlogs = blogs.map((blog) =>
      blog._id == editID ? updatedBlog : blog
    );
    console.log(updatedBlogs);

    await blogService.updateBlog(editID, updatedBlog);

    setBlogs(updatedBlogs);
  };

  const handlelikes = async (e) => {
    const id = e.target.parentNode.parentNode.getAttribute("value");

    const filtered = blogs.filter((blog) => blog._id === id);
    const likesObject = { ...filtered[0], likes: filtered[0].likes + 1 };

    const newObject = blogs.map((blog) =>
      blog._id == id ? likesObject : blog
    );

    await blogService.likeBlog(id, likesObject);

    setBlogs(newObject);
  };

  const handleDelete = async (e) => {
    if (!window.confirm(`Are you sure you want to delete`)) {
      return;
    }

    const id = e.target.getAttribute("value");

    const updatedBlogs = blogs.filter((blog) => blog._id !== id);

    await blogService.deleteBlog(id);

    setBlogs(updatedBlogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });

      console.log(user);

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("Wrong credentials");
      setTimeout(() => {
        console.log(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setLoginVisible(false);
  };

  const handleShowLogin = () => {
    setLoginVisible(!loginVisible);
  };

  return (
    <div>
      {user === null ? (
        <Toggable buttonLabel="login">
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            inputChange={handleInputChanges}
            user={user}
          />
        </Toggable>
      ) : (
        <div>
          <Login user={user.name} handleLogout={handleLogout} />
          <Toggable buttonLabel="add blog">
            <BlogForm
              inputChange={handleInputChanges}
              submit={handleFormSubmit}
            />
          </Toggable>
        </div>
      )}
      <Blogs
        blogs={blogs}
        edit={handleEdit}
        isEdit={isEdit}
        editID={editID}
        inputChange={handleInputChanges}
        save={handleEditSave}
        like={handlelikes}
        handleDelete={handleDelete}
        user={user}
      />
    </div>
  );
}

export default App;
