const BASE_URL = 'http://localhost:3000/persons'

const getAll = () => {
  const request = fetch(BASE_URL)
  return request.then(response => response.json())
}

const create = newObject => {
  const request = fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(newObject),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return request.then(response => response.json())
}

const deteleRecord = id => {
  const request = fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  })
  return request.then(response => response.json())
}

const updateRecord = (id, newObject) => {
    console.log({id, newObject});
    console.log(`${BASE_URL}/${id}`);
    
    
  const request = fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(newObject),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return request.then(response => response.json())
}

export default { getAll, create, deteleRecord, updateRecord }