import Part from "./Part"

const Content = ({data}) => {
    return (
        <div>
            {
                data.map(part => (
                    <Part name={part.name} exercises={part.exercises} />
                ))
            }
        </div>
    )
}

export default Content