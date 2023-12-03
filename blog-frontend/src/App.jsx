import { useEffect, useState } from "react";
import Form from "./components/Form";
import blogService from "./services/blogs";
import Blogs from "./components/Blogs";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
      console.log(allBlogs);
    }

    try {
      fetchBlogs();
    }catch(err){
      console.log(err);
    }

  },[])
  
  const handleInputChanges = (e) => {
    switch(e.target.name){
      case 'title':
        setTitle(e.target.value);
        break;
      case 'url':
        setUrl(e.target.value);
        break;
      case 'author':
        setAuthor(e.target.value);
        break;
      default:
        console.log("Something else changed");
    }
  }

  const handleFormSubmit = (e) => {
    const newBlog = {
      title,
      url,
      author,
      likes: 0
    }

    const addBlog = async () => {
      const returnedBlog = await blogService.createBlog(newBlog);
      setBlogs(blogs.concat(returnedBlog));
    }

    try{
      addBlog();
    } catch(err){
      console.log(err);
    }

    console.log("Form submitted");
  }

  return (
    <div>
      <Form inputChange={handleInputChanges} submit={handleFormSubmit}/>
      <Blogs blogs={blogs} />
    </div>
  );
}

export default App;
