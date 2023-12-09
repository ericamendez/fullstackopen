import { useEffect, useState } from "react";
import Form from "./components/Form";
import blogService from "./services/blogs";
import Blogs from "./components/Blogs";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [isEdit, setIsEdit] = useState(false)
  const [editID, setEditID] = useState("")

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      console.log(allBlogs);
    };

    try {
      fetchBlogs();
    } catch (err) {
      console.log(err);
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
    const id = e.target.parentNode.getAttribute('value');
    const eTitle = e.target.parentNode.childNodes[0].childNodes[1].textContent
    const eUrl = e.target.parentNode.childNodes[1].childNodes[1].textContent
    const eAuthor = e.target.parentNode.childNodes[2].childNodes[1].textContent
    
    setIsEdit(!isEdit)
    setEditID(id)
    setTitle(eTitle)
    setUrl(eUrl)
    setAuthor(eAuthor)
  }

  const handleEditSave = async () => {
    console.log('saved');
    setIsEdit(!isEdit)

    const updatedBlog = {
      title,
      url,
      author
    }

    const editBlog = await blogService.updateBlog(editID, updatedBlog)

    console.log(editBlog);
  }

  return (
    <div>
      <Form inputChange={handleInputChanges} submit={handleFormSubmit} />
      <Blogs blogs={blogs} edit={handleEdit} isEdit={isEdit} editID={editID} inputChange={handleInputChanges} save={handleEditSave}/>
    </div>
  );
}

export default App;
