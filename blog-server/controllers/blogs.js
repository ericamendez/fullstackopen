const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogRouter.get('/', async (request, response) => {
    console.log(`decodedToken`, request.token);

    const allBlogs = await Blog.find({})
    response.json(allBlogs)

})

blogRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog)
    } else {
        response.status(404).end()
    }
})

blogRouter.post('/', async (request, response, next) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    // console.log(`decodedToken`, decodedToken);
    if (!decodedToken.id) {
        console.log('token invalid');
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    // console.log('body', user)

    const blogObject = {
        ...request.body,
        user: user._id
    }

    const blog = await new Blog(blogObject);
    const result = await blog.save();

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    response.status(201).json(result);
})

blogRouter.put('/:id', async (request, response) => {
    const { title, author, url } = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, { title, author, url }, { new: true, runValidators: true, context: 'query' })
    response.status(201).json(result);
})

blogRouter.put('/likes/:id', async (request, response) => {
    const { likes } = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, { likes }, { new: true, runValidators: true, context: 'query' })
    response.status(201).json(result);
})

blogRouter.delete('/:id', async (request, response, next) => {
    try {
        console.log(`request.token`, request.token);
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        const blog = await Blog.findById(request.params.id)
    
        if (!decodedToken || !decodedToken.id) {
          return response.status(401).json({ error: 'token missing or invalid' })
        }
    
        if (decodedToken.id.toString() === blog.user.toString()) {
          await Blog.findByIdAndRemove(blog.id)
          response.status(204).end()
        } else {
          response.status(401).json({ error: 'only user who created the blog can delete it' })
        }
      } catch(exception) {
        next(exception)
      }
})

module.exports = blogRouter