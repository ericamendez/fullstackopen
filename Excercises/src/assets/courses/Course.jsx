import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({courses}) => {
    return (
        <div>
            {
                courses.map(course => {
                    return (
                        <div key={course.id}>
                            <Header name={course.name} />
                            <Content data={course.parts} />
                            <Total data={course.parts} />
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Course