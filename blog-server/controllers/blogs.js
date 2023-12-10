const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
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
    const blog = await new Blog(request.body);
    const result = await blog.save();
    response.status(201).json(result);
})

blogRouter.put('/:id', async (request, response) => {
    const {title, author, url} = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, {title, author, url}, { new: true, runValidators: true, context: 'query' })
    response.status(201).json(result);
})

blogRouter.put('/likes/:id', async (request, response) => {
    const {likes} = request.body
    const result = await Blog.findByIdAndUpdate(request.params.id, {likes}, { new: true, runValidators: true, context: 'query' })
    response.status(201).json(result);
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = blogRouter