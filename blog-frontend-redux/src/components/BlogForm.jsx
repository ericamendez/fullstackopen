const BlogForm = ({ inputChange, submit }) => {

  return (
    <div>
      <h1>Add A Blog Post</h1>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" onChange={inputChange} required name="title" placeholder='input title' id="title" />
        </div>
        <div>
          <label>URL:</label>
          <input type="text" required onChange={inputChange} name="url" id="url" />
        </div>
        <div>
          <label>Author:</label>
          <input type="text" required onChange={inputChange} name="author" id="author" />
        </div>
        <button onClick={submit}>Submit</button>
      </form>
    </div>
  )
}

export default BlogForm
