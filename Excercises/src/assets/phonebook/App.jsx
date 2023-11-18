import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'
import Persons from './components/Persons'
import personsService from '../../services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    personsService
        .getAll()
        .then(initialPersons => {
            setPersons(initialPersons)
        })
  }, [])
  
  const addPerson = (event) => {
    if(persons.some(person => person.name === newName)){
        //Update Persons number
        if(window.confirm(`${newName} already exist, would you like to replace their number?`)){
            const findPerson = persons.find(person => person.name === newName)
            const changedPerson = {...findPerson, number: newNumber}
            
            personsService
                .updateNumber(findPerson.id, changedPerson)
                .then(returnedPerson => {
                    setPersons(person.map(person => person.id !== findPerson.id ? person : returnedPerson))
                })
        } else {
            return
        }
    } else{
        const newPersonObject = {
            name: newName,
            number: newNumber
        }
    
        personsService
            .addPerson(newPersonObject)
            .then(newPerson => {
                console.log(newPerson)
                setPersons(persons.concat(newPerson))
            })
    }
  }

  const deletePerson = (event) => {
    if(!window.confirm(`Are you sure you want to delete "${event.target.name}"`)){
        return
    }

    const newObject = persons.filter(person => person.id !== event.target.value)

    personsService
        .deletePerson(event.target.value)
        .then(response => {
            console.log(response);
            setPersons(newObject)
        })

    personsService
        .getAll()
        .then(initialPersons => {
            setPersons(initialPersons)
        })
  }

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

  const peopleToShow = showAll ? persons : persons.filter(person => person.name.includes(filterValue))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterValue} handleChange={handleInputChange} />
      <NewPersonForm handleAdd={addPerson} name={newName} number={newNumber} handleChange={handleInputChange} />
      <Persons filteredPeople={peopleToShow} handleDelete={deletePerson} />
    </div>
  )
}

export default App