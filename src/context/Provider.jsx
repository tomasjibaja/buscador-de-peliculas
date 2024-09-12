import React, { useState } from 'react'
import Context from './Context'

const Provider = ({children}) => {
  const [search, updateSearch] = useState('')
  const [movies, setMovies] = useState([])

  return (
    <Context.Provider value={{ search, updateSearch, movies, setMovies }}>
      {children}
    </Context.Provider>
  )
}

export default Provider
