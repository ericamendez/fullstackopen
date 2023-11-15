import { useState } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '555-555-5555' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterValue, setFilterValue] = useState('')

  const handleInputChange = (event) => {
    const type = event.target.parentNode.innerText
    switch (type){
        case 'name: ':
            setNewName(event.target.value)
            break
        case 'number: ':
            setNewNumber(event.target.value)
            break
        case 'filter by name ':
            event.target.value.length > 0 ? setShowAll(false) : setShowAll(true)
            setFilterValue(event.target.value)
    }
  }

  const addToPhonebook = (event) => {
    event.preventDefault()
    if(persons.some(person => person.name === newName)){
        alert(`${newName} already exist`)
        return
    }
    const newPersonObject = {
        name: newName,
        number: newNumber
    }
    setPersons(persons.concat(newPersonObject))
  }

  const peopleToShow = showAll ? persons : persons.filter(person => person.name.includes(filterValue))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} handleChange={handleInputChange} />
      <NewPersonForm handleAdd={addToPhonebook} name={newName} number={newNumber} handleChange={handleInputChange} />
      <Persons filteredPeople={peopleToShow} />
    </div>
  )
}

export default App