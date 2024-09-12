import { API_URL } from "./endpoints"

export const searchMovies = async ({ search }) => {
    if (search === '') return null

    try {
        const response = await fetch(`${API_URL}&s=${search}`)
        const json = await response.json()

        const movies = json.Search

        return movies?.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            poster: movie.Poster,
        }))
    } catch (e) {
        throw new Error('Error al buscar película')
    }
  }