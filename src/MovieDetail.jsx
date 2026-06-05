import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useContext } from "react"
import ThemeContext from "./ThemeContext"

function MovieDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    fetch(`https://www.omdbapi.com/?i=${id}&apikey=trilogy`)
      .then(res => res.json())
      .then(data => {
        setMovie(data)
        setLoading(false)
      })
  }, [id])

  if (loading) return <p className="text-center mt-20 text-gray-500">Loading...</p>

  return (
    <div className={`min-h-screen p-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          ← Back to Search
        </button>
        <div className="flex gap-8">
          <img src={movie.Poster} alt={movie.Title} className="w-48 rounded-lg shadow-lg" />
          <div>
            <h1 className="text-3xl font-bold mb-2">{movie.Title}</h1>
            <p className="text-gray-500 mb-4">{movie.Year} • {movie.Genre}</p>
            <p className="mb-2"><strong>Director:</strong> {movie.Director}</p>
            <p className="mb-2"><strong>IMDB Rating:</strong> ⭐ {movie.imdbRating}</p>
            <p className="mt-4 text-gray-600">{movie.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail