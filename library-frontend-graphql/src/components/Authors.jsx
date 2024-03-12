import { useState } from 'react'
import { useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {

  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [birthyear, setBirthyear] = useState('')

  const [editAuthor, result] = useMutation(EDIT_AUTHOR);

  const submit = (event) => {
    event.preventDefault();

    editAuthor({ variables: { name: selectedAuthor, born: birthyear } });

    setSelectedAuthor("");
    setBirthyear("");
  };


  if (!props.show) {
    return null
  }

  const authors = props.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <select onChange={(e) => setSelectedAuthor(e.target.value)}>
          <option value=""></option>
          {authors.map((a) => (
            <option key={a.name} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        <div>
          born
          <input type="number" onChange={(e) => setBirthyear(Number(e.target.value))} />
          <button>Save</button>
        </div>
      </form>
    </div>
  )
}

export default Authors
