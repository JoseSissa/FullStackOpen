import axios from 'axios'
const baseUrl = 'http://localhost:3001'

let token = null
const setToken = newToken => token = `Bearer ${newToken}`

const getAll = () => {
  const request = axios.get(`${baseUrl}/api/notes`)
  return request.then(response => response.data)
}

const create = newObject => {
  const config = {
    headers: {
      Authorization: token,
    },
  }
  
  const request = axios.post(`${baseUrl}/api/notes`, newObject, config)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/api/notes/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteNote = id => {
  const request = axios.delete(`${baseUrl}/api/notes/${id}`)
  return request.then(response => response.data)
}

export default { getAll, create, update, deleteNote, setToken }