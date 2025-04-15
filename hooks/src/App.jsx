import { useState } from 'react'
import Form from './components/Form'

const useCounter = (initialValue = 0) => {
  const [value, setValue] = useState(initialValue)

  const increase = () => {setValue(value + 1)}

  const decrease = () => {setValue(value - 1)}

  const zero = () => {setValue(0)}

  return {
    value, 
    increase,
    decrease,
    zero
  }
}

const App = () => {
  const constA = useCounter(10)
  const constB = useCounter(20)

  return (
    <>
      <div>
        <div>{constA.value}</div>
        <button onClick={constA.increase}>
          plus
        </button>
        <button onClick={constA.decrease}>
          minus
        </button>      
        <button onClick={constA.zero}>
          zero
        </button>
        <div>{constB.value}</div>
        <button onClick={constB.increase}>
          plus
        </button>
        <button onClick={constB.decrease}>
          minus
        </button>      
        <button onClick={constB.zero}>
          zero
        </button>
      </div>

      <Form />
    </>
  )
}

export default App
