import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setEdit, resetEdit } from '../reducers/editReducer'

export const useField = (type, name) => {

  const edit = useSelector((state) => state.edit)
  const dispatch = useDispatch()

  const onChange = (event) => {
    dispatch(setEdit({ ...edit, [name]: event.target.value }))
  }

  const onReset = () => {
    dispatch(resetEdit())
  }

  return {
    type,
    value: edit[type],
    onChange,
    onReset
  }
}