import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}


export const createNewNote = async (content) => {
    const object = { content, important: false }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export const updateNote = async (content) => {  
    const object = { ...content, important: !content.important }
    const response = await axios.put(`${baseUrl}/${content.id}`, object)
    return response.data
}