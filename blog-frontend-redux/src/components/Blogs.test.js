import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blogs from './Blogs'

test('renders content', () => {
  const blogs = [{
    _id:'656cf61822b1f55d815c7238',
    title:'new new BLESSED',
    author:'caro',
    url:'rtuykhlio',
    likes:20,
  }]

  const user = {
    username: 'caro',
    name: 'caro',
    id: '656cf61822b1f55d815c7238'
  }

  render(<Blogs blogs={blogs} user={user} />)

  const element = screen.getByText('new new BLESSED')
  expect(element).toBeDefined()
})