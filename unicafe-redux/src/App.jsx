import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { goodAction, okAction, badAction, zeroAction } from './reducer'

const App = () => {
  const dispatch = useDispatch()
  const vote = useSelector(state => state)

  const good = () => dispatch(goodAction())
  const ok = () => dispatch(okAction())
  const bad = () => dispatch(badAction())
  const zero = () => dispatch(zeroAction())
  
  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button> 
      <button onClick={bad}>bad</button>
      <button onClick={zero}>reset stats</button>
      <div>good {vote.good}</div>
      <div>ok {vote.ok}</div>
      <div>bad {vote.bad}</div>
    </div>
  )
}

export default App
