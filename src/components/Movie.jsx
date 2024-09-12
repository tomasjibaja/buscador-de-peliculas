import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { API_URL } from "../services/endpoints"

const Movie = () => {
  const datos = useParams()
  const [movie, setMovie] = useState({})
  const navegarA = useNavigate()

  useEffect(() => {
    fetch(`${API_URL}&i=${datos?.id}`)
    .then((res) => res.json())
    .then((res) => setMovie(res))
    .catch((error) => console.log(error))
  }, [])

  const handleBack = () => {
    navegarA(-1)
  }

  return (
    <div className='movie-page'>
      <button onClick={handleBack}>Volver a búsqueda</button>
      <Link target='blank' to={`https://m.cinesargentinos.com.ar/busqueda/?q=${movie.Title}`}><button >Comprar entradas</button></Link>
      <div className='movie-container'>
        <div className="movie-main">
          <h2 className='movie-title'>{movie.Title} <span className='movie-year'>({movie.Year})</span></h2>
          <img className='movie-img' src={movie.Poster} alt="" />
        </div>
        <div className="movie-info">
          <h4 className='movie-duration'>Duración: {movie.Runtime}</h4>
          <h4 className='movie-rating'>Calificación: {movie.Rated}</h4>
          <h4>Género: <span className='movie-genre'>{movie.Genre}</span></h4>
          <h4>Director: <span className='movie-director'>{movie.Director}</span></h4>
          <h4>Reparto: <span className='movie-cast'>{movie.Actors}</span></h4>
          <div className="ratings">
            <h4>Ratings</h4>
            {movie.Ratings != undefined && <div className="ratings-wrapper">
              <span>Internet Movie Database: {movie.Ratings[0]?.Value}</span>
              <span>RottenTomatoes: {movie.Ratings[1]?.Value}</span>
              <span>Metacritic: {movie.Ratings[2]?.Value}</span>
            </div>}
          </div>
          <h4 className='movie-plot'>Sinopsis</h4>
          <p>{movie.Plot}</p>
        </div>
      </div>
    </div>

  )
}

export default Movie
