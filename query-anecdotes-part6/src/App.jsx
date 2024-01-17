import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {getAnecdotes, updateVotes} from "./services/requests";

const App = () => {
  const handleVote = (anecdote) => {
    updateVotes(anecdote.id);
  };

  // const updateNoteMutation = useMutation({
  //   mutationFn: handleVote,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries('notes')
  //   },
  // })

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: false
  });

  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
