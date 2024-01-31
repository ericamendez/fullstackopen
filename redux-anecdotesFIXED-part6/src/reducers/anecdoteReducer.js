import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote(state, action){
      console.log('act',action.payload); // createSlice will automatically create action creators for each reducer function, and what is being returned is in action.payload
      console.log('state',state);
      return state.map(anecdote => anecdote.id === action.payload.id ? action.payload : anecdote)
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    },
    setAnecdotes(_, action){
      return action.payload
    }
  }
})

export const { appendAnecdote, setAnecdotes, vote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {

    const anecdoteToVote = await anecdoteService.updateVotes(id)
    dispatch(vote(anecdoteToVote))
  }
}

export default anecdoteSlice.reducer
