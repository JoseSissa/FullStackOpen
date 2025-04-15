import useField from '../Hooks/useField.js'

export const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    
    props.addNew({
      content : content.value,
      author : author.value,
      info : info.value,
      votes: 0
    })
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input type={content.value} value={content.value} onChange={content.onChange} />
        </div>
        <div>
            author
            <input type={author.value} value={author.value} onChange={author.onChange} />
        </div>
        <div>
            url for more info
            <input type={info.value} value={info.value} onChange={info.onChange} />
        </div>
        <button onSubmit={handleSubmit}>create</button>
        <button onClick={handleReset}>Reset</button>
      </form>
    </div>
  )

}