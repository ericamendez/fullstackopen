// import { useState } from 'react'

const date = new Date

const Hello = (props) => {
  return (
    <div>
      <p>Hello World {props.name}</p>
    </div>
  )
}

const App = () => {
  return (
    <div>
      <p>Hello World today is: {date.toString()}</p>
      <Hello name="Erica"/>
      <Hello name="Carolina"/>
      <Hello name="Emely"/>
    </div>
  )
}

export default App
