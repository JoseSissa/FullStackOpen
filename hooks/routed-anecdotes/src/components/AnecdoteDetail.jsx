import { useParams } from 'react-router-dom'

export const AnecdoteDetail = ({ anecdotes }) => {
    const { anecId } = useParams()
    
    const anecdote = anecdotes.find(a => a.id === Number(anecId))
    
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <p>by {anecdote.author}</p>
            <p>{anecdote.info}</p>
        </div>
    )
}