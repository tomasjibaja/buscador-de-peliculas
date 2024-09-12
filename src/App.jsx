import './App.css'
import SearchPage from './components/SearchPage'
import Movie from './components/Movie'
import { Routes, Route } from 'react-router-dom'
import Provider from './context/Provider'


function App () {
  return (
    <>
      <Provider>
        <Routes>
          <Route path='/' element={ <SearchPage /> } />
          <Route path='/:id' element={ <Movie /> } />
        </Routes>
      </Provider>
    </>
  )
}

export default App
