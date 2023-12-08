import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Game from './routes/Game'
import Home from './routes/Home'

function App () {
  return (
    <BrowserRouter>
      <div id='main'>
      <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game' element={<Game />} />
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
