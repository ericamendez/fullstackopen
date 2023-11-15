const Total = ({data}) => {
    let totalParts = data.reduce((acc, part) => {
        return acc+part.exercises
    }, 0)
    return (
        <div>
            <p>Number of Excercises {totalParts}</p>
        </div>
    )
} 

export default Total