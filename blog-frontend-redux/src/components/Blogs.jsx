import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit, saveEdit } from '../reducers/editReducer'
import { useField } from '../hooks'


const Blogs = ({
  // inputChange,
  save,
  like,
  handleDelete,
  user,
}) => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.votes - a.votes)

  const dispatch = useDispatch()

  const handleEdit = (id, title, author, url) => {
    dispatch(setEdit({ id, title, author, url }))
  }
  const isEdit = useSelector((state) => state.edit)
  const title = useField('text', 'title')
  const author = useField('text', 'author')
  const url = useField('text', 'url')


  const handleEditSave = () => {
  }

  const handleReset = (e) => {
    e.preventDefault()
    title.onReset()
    author.onReset()
    url.onReset()
  }

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
      {sortedBlogs.map((blog) => {
        const showButtonsWhenUserLoggedIn = {
          display: user !== null && user.id === blog.user ? '' : 'none',
        }
        return (
          <div key={blog._id} className={user && blog.user === user.id ? 'all-blog-container blog-user' : 'all-blog-container'}>
            <div className="blog">
              <h2>
                {isEdit.id === blog._id ? (
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
                {isEdit.id === blog._id? (
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
                {isEdit.id === blog._id ? (
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
                  <button onClick={like} value={blog._id}>{'<3'}</button>
                  <div style={showButtonsWhenUserLoggedIn}>
                    {isEdit.id ? (
                      <span>
                        <button onClick={save}>Save</button>
                        <button onClick={handleReset}>Cancel</button>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleEdit(blog._id, blog.title, blog.author, blog.url)}
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
