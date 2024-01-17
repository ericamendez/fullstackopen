import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(res => res.data)


 export const updateVotes = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const anecdote = response.data
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    console.log('anecdote response', updatedAnecdote);
    const response2 = await axios.put(`${baseUrl}/${id}`, updatedAnecdote)
    return response2.data
}