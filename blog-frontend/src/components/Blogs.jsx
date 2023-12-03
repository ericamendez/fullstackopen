const Blogs = ({ blogs }) => {
  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map(blog => {
        return (
          <div key={blog._id}>
            <h2>Title: {blog.title}</h2>
            <p>URL: {blog.url}</p>
            <p>Author: {blog.author}</p>
            <p>Likes: {blog.likes}</p>
          </div>
        )
      
      })}
    </div>
  );
}

export default Blogs;