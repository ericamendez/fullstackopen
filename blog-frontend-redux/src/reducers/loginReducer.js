import { createSlice, current } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogServices from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    password: '',
    user: null,
  },
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
    resetLogin() {
      return {
        username: '',
        password: '',
      }
    },
    logout(state, action) {
      return {
        username: '',
        password: '',
        user: null,
      }
    }
  }
})

export const { setLogin, resetLogin, logout } = loginSlice.actions

export const saveLogin = () => {
  return async (dispatch, getState) => {
    console.log('logging in with', getState().login)
    // try {
    const login = getState().login
    console.log(login)
    const user = await loginService.login({
      username: login.username,
      password: login.password,
    })
    console.log('USER', user)

    const newUser = { username: '',password:'', user: user }

    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    blogServices.setToken(user.token)

    dispatch(setLogin(newUser))
    // } catch (exception) {
    //   console.log('Wrong credentials')
    //   setTimeout(() => {
    //     console.log(null)
    //   }, 5000)
    // }
  }
}

export default loginSlice.reducer