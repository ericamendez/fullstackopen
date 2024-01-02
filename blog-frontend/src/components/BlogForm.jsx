const BlogForm = ({ inputChange, submit}) => {

  return (
    <div>
      <h1>Add A Blog Post</h1>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" onChange={inputChange} required name="title" />
        </div>
        <div>
          <label>URL:</label>
          <input required onChange={inputChange} name="url" />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" required onChange={inputChange} name="author" />
        </div>
        <button onClick={submit}>Add Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
