import { useState, useEffect } from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import ThemeContext from "./ThemeContext"
import MovieCard from "./MovieCard"
import { auth } from "./firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"

function Home() {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate("/auth")
      } else {
        setUser(currentUser)
      }
    })
    return unsubscribe
  }, [])

  function searchMovies() {
    setLoading(true)
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=trilogy`)
      .then(res => res.json())
      .then(data => {
        setMovies(data.Search || [])
        setLoading(false)
      })
  }

  return (
    <div className={`min-h-screen p-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">🎬 Movie Search</h1>
        {user && (
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">Logged in as {user.email}</p>
            <div className="flex gap-2">
              <button
                onClick={() => navigate("/favourites")}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
              >
                ❤️ My Favourites
              </button>
              <button
                onClick={() => signOut(auth)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        )}
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