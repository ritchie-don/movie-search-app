import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import ThemeContext from "./ThemeContext"

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const { theme } = useContext(ThemeContext)

  return (
    <div
      onClick={() => navigate(`/movie/${movie.imdbID}`)}
      className={`cursor-pointer rounded-lg overflow-hidden w-40 shadow-md hover:shadow-xl transition-shadow ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <img src={movie.Poster} alt={movie.Title} className="w-full" />
      <div className="p-2">
        <h3 className="font-bold text-sm">{movie.Title}</h3>
        <p className="text-xs text-gray-400">{movie.Year}</p>
      </div>
    </div>
  )
}

export default MovieCard