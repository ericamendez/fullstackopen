import {useField} from "../hooks";

const CreateNew = (props) => {
    const content = useField("text");
    const author = useField("text");
    const info = useField("text");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0,
      });
    };

    const handleReset = (e) => {
        e.preventDefault();
        content.onReset();
        author.onReset();
        info.onReset();
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content
            <input
              name="content"
             {...content}
            //   type={content.type}
            //   value={content.value}
            //   onChange={content.onChange}
            // onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div>
            author
            <input
              name="author"
              {...author}
            />
          </div>
          <div>
            url for more info
            <input
              name="info"
              {...info}
            />
          </div>
          <button>create</button>
          <button onClick={handleReset}>reset</button>
        </form>
      </div>
    );
  };

export default CreateNew;