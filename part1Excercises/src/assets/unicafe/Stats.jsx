const Stats = ({good, neutral, bad}) => {
    const getAll = () => {
        return good + bad + neutral
    }

    const getAverage = () => {
        return `${(neutral / getAll()) * 100}%`
    }

    const getPositive = () => {
        return `${(good / getAll()) * 100}%`
    }

    if(getAll() > 0){
        return (
            <div>
                <h2>Stats</h2>
                <table>
                    <tbody>
                        <tr>
                            <td>good</td>
                            <td>{good}</td>
                        </tr>
                        <tr>
                            <td>neutral </td>
                            <td>{neutral}</td>
                        </tr>
                        <tr>
                            <td>bad</td>
                            <td>{bad}</td>
                        </tr>
                        <tr>
                            <td>all</td>
                            <td>{getAll()}</td>
                        </tr>
                        <tr>
                            <td>average</td>
                            <td>{getAverage()}</td>
                        </tr>
                        <tr>
                            <td>positive</td>
                            <td>{getPositive()}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                <p>No Feedback Given</p>
            </div>
        )
    }

}

export default Stats