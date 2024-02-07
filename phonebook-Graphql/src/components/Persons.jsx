const Persons = ({filteredPeople, handleDelete}) => {
    return (
        <div>
            <h3>Numbers</h3>
            <div>
                {filteredPeople.map(person => {
                    return (
                        <div key={person.id}>
                            <p>{person.name} {person.number}</p>
                            <button value={person.id} onClick={handleDelete} name={person.name}>delete</button>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}

export default Persons