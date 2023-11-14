import Button from "./Button"
import { useState } from "react"
import Stats from "./Stats"

const App = () => {

    const [bad, setBad] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [good, setGood] = useState(0)

    const setReview = (type) => {
        switch(type){
            case 'bad':
                setBad(bad + 1)
                break;
            case 'neutral':
                setNeutral(neutral + 1)
                break;
            case 'good':
                setGood(good + 1)
                break;
        }

    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <Button handleClick={() => setReview('bad')} text={'bad'}/>
            <Button handleClick={() => setReview('neutral')} text={'neutral'}/>
            <Button handleClick={() => setReview('good')} text={'good'}/>
            <Stats good={good} neutral={neutral} bad={bad}  />
        </div>
    )
}

export default App