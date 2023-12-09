const Blogs = ({ blogs, edit, isEdit, editID, inputChange, save }) => {
  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map(blog => {
        return (
          <div key={blog._id} value={blog._id}>
            <h2>Title: {isEdit && blog._id == editID ? <input defaultValue={blog.title} onChange={inputChange} name={'title'}></input> : blog.title}</h2>
            <p>URL: {isEdit && blog._id == editID ? <input defaultValue={blog.url} onChange={inputChange} name={'url'}></input> : blog.url}</p>
            <p>Author: {isEdit && blog._id == editID ? <input defaultValue={blog.author} onChange={inputChange} name={'author'}></input> : blog.author}</p>
            <p>Likes: {blog.likes}</p>
            <button>{`<3`}</button>
            {isEdit ? <button onClick={save} >Save</button> : <button onClick={edit}>Edit</button>}
          </div>
        )
      
      })}
    </div>
  );
}

export default Blogs;