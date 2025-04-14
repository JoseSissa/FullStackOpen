import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Notes from '../Notes'
import NoteDetail from './NoteDetail';

export default function HeaderComponent() {
    const notes = useSelector(state => state.notes);
    
    
    return (
        <BrowserRouter>
            <header>
                <Link to="/">Home</Link>
                <Link to="/users">Users</Link>
                <Link to="/notes">Notes</Link>
            </header>
            <Routes>
                <Route path="/" element={<h1>Home</h1>} />
                <Route path="/users" element={<h1>Users</h1>} />
                <Route path="/notes" element={<Notes/>} />
                <Route path="/notes/:noteId" element={<NoteDetail notes={notes} />} />
            </Routes>
        </BrowserRouter>
    )
}