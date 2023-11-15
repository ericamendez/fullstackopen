const Persons = ({filteredPeople}) => {
    return (
        <div>
            <h3>Numbers</h3>
            <div>
                {filteredPeople.map(person => {
                    return (
                        <div>
                            <p>{person.name} {person.number}</p>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default Persons