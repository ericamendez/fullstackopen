const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb } = require('./test_helper')



beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

// test('blogs are returned as json', async () => {
//   await api
//     .get('/api/blogs')
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'First class tests'
  )
})

test('a valid note can be added', async () => {
  const newBlog = {
    title: "Test",
    author: "Erica Mendez",
    url: "https://reactpatterns.com/",
    likes: 176,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await blogsInDb()
  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)

  const contents = blogsAtEnd.map(r => r.title)

  expect(blogsAtEnd).toHaveLength(initialBlogs.length + 1)
  expect(contents).toContain(
    'Test'
  )
})

test('blog without content is not added', async () => {
  const newBlog = {
    title: true
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(500)

  const blogsAtEnd = await blogsInDb()


  expect(blogsAtEnd).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})