import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, handleDelete } from '../reducers/blogsReducer'
import { setEdit, saveEdit } from '../reducers/editReducer'
import { toggleShowMoreBlog } from '../reducers/toggleReducer'
import { useField } from '../hooks'


const Blogs = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.votes - a.votes)
  const showBlogs = useSelector((state) => state.toggle.showMoreBlog)
  const user = useSelector((state) => state.login.user)

  const dispatch = useDispatch()

  const edit = useSelector((state) => state.edit)
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')

  const handleEdit = (id, title, author, url, likes) => {
    dispatch(setEdit({ id, title, author, url, likes }))
  }

  const handleReset = (e) => {
    e.preventDefault()
    title.onReset()
    author.onReset()
    url.onReset()
  }

  return (
    <div>
      <h1>All Blogs</h1>
      {sortedBlogs.map((blog) => {
        const showButtonsWhenUserLoggedIn = {
          display: user !== null && user.id === blog.user ? '' : 'none',
        }
        return (
          <div key={blog._id} className={user && blog.user === user.id ? 'all-blog-container blog-user' : 'all-blog-container'}>
            <div className="blog">
              <h2>
                {edit.id === blog._id ? (
                  <input
                    defaultValue={blog.title}
                    name={'title'}
                    {...title}
                  ></input>
                ) : (
                  blog.title
                )}
              </h2>
              <div>
                <button onClick={() => dispatch(toggleShowMoreBlog(blog._id))} value={blog._id}>
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
                {edit.id === blog._id? (
                  <input
                    defaultValue={blog.url}
                    name={'url'}
                    {...url}
                  ></input>
                ) : (
                  blog.url
                )}
              </p>
              <p>
                Author:{' '}
                {edit.id === blog._id ? (
                  <input
                    defaultValue={blog.author}
                    name={'author'}
                    {...author}
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
                  <button onClick={() => dispatch(likeBlog(blog._id))}>{'<3'}</button>
                  <div style={showButtonsWhenUserLoggedIn}>
                    {edit.id ? (
                      <span>
                        <button onClick={() => dispatch(saveEdit(edit))}>Save</button>
                        <button onClick={handleReset}>Cancel</button>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleEdit(blog._id, blog.title, blog.author, blog.url, blog.likes)}
                      >
                        Edit
                      </button>
                    )}
                    <button onClick={() => dispatch(handleDelete(blog._id))} className="delete-button">
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
