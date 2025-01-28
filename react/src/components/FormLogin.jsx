import { useState } from 'react'
import loginService from '../services/loginService.js'
import noteService from '../services/noteService.js'

export const FormLogin = ({ setUser, setErrorMessage }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginVisible, setLoginVisible] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        
        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem(
              'loggedNoteappUser', JSON.stringify(user)
            )
            
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')

          } catch (exception) {
            setErrorMessage(exception.response.data.error.message)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3500)
            console.log(exception.response.data.error.message)
          }
    }

  return (
    <>
        {
          loginVisible
            ? (
              <>
                <form onSubmit={handleLogin}>
                  <div>
                    <label>
                      Username
                      <input
                          type="text"
                          value={username}
                          name="Username"
                          onChange={({ target }) => setUsername(target.value)}
                          data-testid="username"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Password
                      <input
                          type="password"
                          value={password}
                          name="Password"
                          onChange={({ target }) => setPassword(target.value)}
                          data-testid="password"
                      />
                    </label>
                  </div>
                  <button type="submit">Sign in</button>
                </form>
                <button onClick={() => setLoginVisible(!loginVisible)}>Cancel</button>
              </>
            )
            : (
              <button onClick={() => setLoginVisible(!loginVisible)}>
                Login
              </button>
            )
        }
    </>
  )
}