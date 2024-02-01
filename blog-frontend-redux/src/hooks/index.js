import { useSelector, useDispatch } from 'react-redux'
import { setEdit, resetEdit } from '../reducers/editReducer'
import { setLogin, resetLogin } from '../reducers/loginReducer'
import { setCreateBlog, resetCreateBlog } from '../reducers/createBlogReducer'

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

export const useFieldLogin = (type, name) => {

  const login = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const onChange = (event) => {
    dispatch(setLogin({ ...login, [name]: event.target.value }))
  }

  const onReset = () => {
    dispatch(resetLogin())
  }

  return {
    type,
    value: login[name],
    onChange,
    onReset
  }
}

export const useFieldCreate = (type, name) => {

  const createBlog = useSelector((state) => state.createBlog)
  const userId = useSelector((state) => state.login.user.id)
  const dispatch = useDispatch()

  const onChange = (event) => {
    dispatch(setCreateBlog({ ...createBlog, [name]: event.target.value, userId }))
  }

  const onReset = () => {
    dispatch(resetCreateBlog())
  }

  return {
    type,
    value: createBlog[name],
    onChange,
    onReset
  }
}