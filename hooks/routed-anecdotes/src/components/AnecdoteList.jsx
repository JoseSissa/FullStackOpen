import { Link } from 'react-router-dom'

export const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote => {
            return (
                <div key={anecdote.id}>
                    <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
                    <br/>
                </div>
            )
            })}
        </ul>
    </div>
)