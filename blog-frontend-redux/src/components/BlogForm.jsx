import { useDispatch, useSelector } from 'react-redux'
import { useFieldCreate } from '../hooks'
import { createBlog } from '../reducers/blogsReducer'


const BlogForm = () => {

  const title = useFieldCreate('text', 'title')
  const url = useFieldCreate('text', 'url')
  const author = useFieldCreate('text', 'author')

  const newBlog = useSelector((state) => state.createBlog)

  const dispatch = useDispatch()

  return (
    <div>
      <h1>Add A Blog Post</h1>
      <form>
        <div>
          <label>Title:</label>
          <input {...title} required name="title" placeholder='input title' id="title" />
        </div>
        <div>
          <label>URL:</label>
          <input {...url} required name="url" id="url" />
        </div>
        <div>
          <label>Author:</label>
          <input {...author}required name="author" id="author" />
        </div>
        <button onClick={() => dispatch(createBlog(newBlog))}>Submit</button>
      </form>
    </div>
  )
}

export default BlogForm
