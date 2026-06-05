import { useState } from "react"
import { useContext } from "react"
import ThemeContext from "./ThemeContext"
import MovieCard from "./MovieCard"

function Home() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const { theme, toggleTheme } = useContext(ThemeContext)

 function searchMovies() {
  console.log("search button clicked")
  setLoading(true)
 fetch(`https://www.omdbapi.com/?s=batman&apikey=trilogy`)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setMovies(data.Search || [])
      setLoading(false)
    })
}
  return (
    <div className={`min-h-screen p-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">🎬 Movie Search</h1>
        <button
          onClick={toggleTheme}
          className="mb-6 px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
        <div className="flex gap-2 mb-8">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search a movie..."
            className="border border-gray-300 rounded px-4 py-2 w-full text-gray-900"
          />
          <button
            onClick={searchMovies}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        <div className="flex flex-wrap gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home