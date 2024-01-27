import { useState } from 'react'
import { useSelector } from 'react-redux'

const Blogs = ({
  edit,
  isEdit,
  editID,
  inputChange,
  save,
  like,
  handleDelete,
  user,
}) => {
  const blogs = useSelector((state) => state.blogs)

  const [showBlogs, setShowBlogs] = useState([])

  const toggleShowMore = (e) => {
    const id = e.target.getAttribute('value')

    if (showBlogs.includes(id)) {
      setShowBlogs(showBlogs.filter((blogId) => blogId !== id))
    } else {
      setShowBlogs([...showBlogs, id])
    }
  }

  return (
    <div>
      <h1>All Blogs</h1>
      {blogs.map((blog) => {
        const showButtonsWhenUserLoggedIn = {
          display: user !== null && user.id === blog.user ? '' : 'none',
        }
        return (
          <div key={blog._id} className={user && blog.user === user.id ? 'all-blog-container blog-user' : 'all-blog-container'}>
            <div className="blog">
              <h2>
                {isEdit && blog._id === editID ? (
                  <input
                    defaultValue={blog.title}
                    onChange={inputChange}
                    name={'title'}
                  ></input>
                ) : (
                  blog.title
                )}
              </h2>
              <div>
                <button onClick={toggleShowMore} value={blog._id}>
                  {showBlogs.includes(blog._id) ? 'hide' : 'view'}
                </button>
              </div>
            </div>
            <div
              style={
                showBlogs.includes(blog._id)
                  ? { display: '' }
                  : { display: 'none' }
              }
              className={user && blog.user === user.id ? 'blog-user' : ''}
            >
              <p>
                URL:{' '}
                {isEdit && blog._id === editID ? (
                  <input
                    defaultValue={blog.url}
                    onChange={inputChange}
                    name={'url'}
                  ></input>
                ) : (
                  blog.url
                )}
              </p>
              <p>
                Author:{' '}
                {isEdit && blog._id === editID ? (
                  <input
                    defaultValue={blog.author}
                    onChange={inputChange}
                    name={'author'}
                  ></input>
                ) : (
                  blog.author
                )}
              </p>
              <p>Likes: {blog.likes}</p>
              {user === null ? (
                ''
              ) : (
                <div className="button-container">
                  <button onClick={like} value={blog._id}>{'<3'}</button>
                  <div style={showButtonsWhenUserLoggedIn}>
                    {isEdit ? (
                      <button onClick={save}>Save</button>
                    ) : (
                      <button
                        onClick={() => edit(blog._id, blog.title, blog.author, blog.url)}
                      >
                        Edit
                      </button>
                    )}
                    <button onClick={handleDelete} value={blog._id} className="delete-button">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Blogs
