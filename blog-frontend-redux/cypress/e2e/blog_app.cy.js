describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
  })


  describe('when logged in', async function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('add blog').click()
      cy.get('#title').type('a blog created by cypress')
      cy.get('#url').type('cypress.com')
      cy.get('#author').type('cypress')
      cy.contains('Submit').click()
      cy.contains('a blog created by cypress')
      cy.contains('view').click()
    })

    // it('it can be viewed', function () {
    //   cy.contains('a blog created by cypress')
    //     .contains('view')
    //     .click()

    //   cy.contains('a blog created by cypress')
    //     .contains('<3')
    // })
  })


})