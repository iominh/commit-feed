import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CommitList from './components/CommitList/CommitList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <CommitList />
    </div>
  )
}

export default App
