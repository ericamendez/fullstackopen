import Part from "./Part"

const Content = ({data}) => {
    return (
        <div>
            {
                data.map(part => (
                    <Part key={part.id} name={part.name} exercises={part.exercises} />
                ))
            }
        </div>
    )
}

export default Content