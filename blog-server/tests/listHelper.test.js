const listHelper = require('../utils/list_helper')

const most = {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
}

const mostAuthor = {
    author: "Robert C. Martin",
    blogs: 3
}

const favAuthor = { author: 'Edsger W. Dijkstra', likes: 17 }

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listHelper.blogs)
        expect(result).toBe(36)
    })
})

describe('most popular blog post', () => {

    test('which blog has the highest likes count', () => {
        const result = listHelper.favoriteBlog(listHelper.blogs)
        expect(result).toEqual(most)
    })
})

describe('author with most blogs', () => {

    test('which author has written the most blogs', () => {
        const result = listHelper.mostBlogs(listHelper.blogs)
        expect(result).toEqual(mostAuthor)
    })
})

describe('favorite author', () => {

    test('author with the most likes', () => {
        const result = listHelper.favoriteAuthor(listHelper.blogs)
        expect(result).toEqual(favAuthor)
    })
})