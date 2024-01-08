import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const submit = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm submit={submit} />)

  const input = screen.getByPlaceholderText('input title')
  const sendButton = screen.getByText('Submit')

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(submit.mock.calls).toHaveLength(1)
  console.log(submit.mock.calls[0][0])
  expect(submit.mock.calls[0][0].content).toBe('testing a form...')
})