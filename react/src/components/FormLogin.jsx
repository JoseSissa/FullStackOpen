import { useState } from 'react'
import loginService from '../services/login'

export const FormLogin = ({ setUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const user = await loginService.login({
              username, password,
            })
            setUser(user)
            setUsername('')
            setPassword('')
          } catch (exception) {
            console.log({exception})
            
            // setErrorMessage('Wrong credentials')
            // setTimeout(() => {
            //   setErrorMessage(null)
            // }, 5000)
          }
    }

  return (
    <>
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    </>
  )
}