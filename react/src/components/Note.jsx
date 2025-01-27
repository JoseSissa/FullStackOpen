const Note = ({ note, toggleImportanceOf, deleteNote }) => {
  const label = note.important
    ? 'make not important' : 'make important'

  return (
    <li className="note">
      {note.content} 
      <button onClick={toggleImportanceOf}>{label}</button>
      <button onClick={deleteNote}>Delete</button>
    </li>
  )
}

export default Note