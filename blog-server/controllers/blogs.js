const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const allBlogs = await Blog.find({})
    response.json(allBlogs)

})

blogRouter.post('/', async (request, response) => {
    try {
        const blog = await new Blog(request.body);
        const result = await blog.save();
        response.status(201).json(result);
    } catch (error) {
        // Handle any errors here
        response.status(500).json({ error: 'Internal Server Error' });
    }
})

module.exports = blogRouter