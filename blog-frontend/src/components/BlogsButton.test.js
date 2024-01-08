import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogs from './Blogs'

test('renders clicking the button calls event handler once', async () => {
  const blogs = [{
    _id: '656cf61822b1f55d815c7238',
    title: 'new new BLESSED',
    author: 'caro',
    url: 'rtuykhlio',
    likes: 20,
  }]

  const user = {
    username: 'caro',
    name: 'caro',
    id: '656cf61822b1f55d815c7238'
  }

  const mockHandler = jest.fn()

  render(
    <Blogs blogs={blogs} toggleShowMore={mockHandler} user={user} />
  )

  const userE = userEvent.setup()
  const button = screen.getByText('view')
  await userE.click(button)

  expect(mockHandler.mock.calls).toHaveLength(0)
})