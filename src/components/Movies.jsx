import Plot from './Plot'
import { useNavigate } from 'react-router-dom'

/* eslint-disable react/prop-types */
function Movies ({ movies }) { 
  const hasMovies = movies?.length > 0
  
  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoResults />
  )
}

function ListOfMovies ({ movies }) {
  const navegarA = useNavigate()

  const handleClick = ( id ) => {
    navegarA(`/${id}`)
  }

  return (
    <>
      <ul className="movies">
      {movies.map((movie) => (
        <li className='movie' key={movie.id} onClick={() => handleClick(movie.id)}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <div className='card'>
            <img src={movie.poster} alt={movie.title} />
            <Plot id={movie.id} />
          </div>
        </li>
      ))}
    </ul>
    </>
    
  )
}

function NoResults () {
  return <p>No hay resultados</p>
}

export default Movies