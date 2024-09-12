import { useCallback, useEffect, useRef, useState, useContext } from 'react'
import Movies from './Movies.jsx'
import { useMovies } from '../hooks/useMovies.js'
import debounce from 'just-debounce-it'
import Context from '../context/Context.jsx'

function useSearch () {
  const { search, updateSearch } = useContext(Context)
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error, isFirstInput }
}

function SearchPage () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, getMovies, loading, fetchError }  = useMovies({ search, sort })

  useEffect(() => {
    if (search != '') {
      getMovies({ search })
    }
  }, [])

  const debouncedGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
  , [])

  function handleSubmit (event) {
    event.preventDefault()
    getMovies({ search })
  }

  function handleSort () {
    setSort(!sort)
  }

  function handleChange (event) {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }

  return (
    <div className='page'>
      <header>
        <h1>Buscador de películas</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={search} name='query' placeholder='Star Wars, Matrix, Inception ...' />
          <button type='submit'>Buscar</button>
          <input id='sort' type="checkbox" onChange={handleSort} checked={sort} />
          <label htmlFor="sort">ordenar alfabéticamente</label>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {fetchError && <p style={{ color: 'red' }}>{fetchError}</p>}
        {loading && <h2 className='loader'>Cargando...</h2>}
      </header>
      <main>
        <Movies movies={ movies } />
      </main>
    </div>

  )
}

export default SearchPage
