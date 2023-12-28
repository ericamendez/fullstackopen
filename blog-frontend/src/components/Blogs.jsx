const Blogs = ({
  blogs,
  edit,
  isEdit,
  editID,
  inputChange,
  save,
  like,
  handleDelete,
  user,
}) => {
  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.map((blog) => {
        const showButtonsWhenUserLoggedIn = {
          display: user != null && user.id === blog.user ? "" : "none",
        };
        return (
          <div key={blog._id} value={blog._id}>
            <h2>
              Title:{" "}
              {isEdit && blog._id == editID ? (
                <input
                  defaultValue={blog.title}
                  onChange={inputChange}
                  name={"title"}
                ></input>
              ) : (
                blog.title
              )}
            </h2>
            <p>
              URL:{" "}
              {isEdit && blog._id == editID ? (
                <input
                  defaultValue={blog.url}
                  onChange={inputChange}
                  name={"url"}
                ></input>
              ) : (
                blog.url
              )}
            </p>
            <p>
              Author:{" "}
              {isEdit && blog._id == editID ? (
                <input
                  defaultValue={blog.author}
                  onChange={inputChange}
                  name={"author"}
                ></input>
              ) : (
                blog.author
              )}
            </p>
            <p>Likes: {blog.likes}</p>
            {user === null ? (
              ""
            ) : (
              <div>
                <button onClick={like}>{`<3`}</button>
                <div style={showButtonsWhenUserLoggedIn}>
                  {isEdit ? (
                    <button onClick={save}>Save</button>
                  ) : (
                    <button onClick={edit}>Edit</button>
                  )}
                  <button onClick={handleDelete}>Delete</button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
