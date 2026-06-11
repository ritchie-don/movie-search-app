import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import ThemeContext from "./ThemeContext"
import { db, auth } from "./firebase"
import { collection, query, where, getDocs } from "firebase/firestore"

function Favourites() {
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchFavourites() {
      const user = auth.currentUser
      if (!user) return

      const q = query(
        collection(db, "favourites"),
        where("userId", "==", user.uid)
      )
      const snapshot = await getDocs(q)
      const movies = snapshot.docs.map(doc => doc.data())
      setFavourites(movies)
      setLoading(false)
    }

    fetchFavourites()
  }, [])

  return (
    <div className={`min-h-screen p-8 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="mb-6 px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          ← Back to Search
        </button>
        <h1 className="text-4xl font-bold mb-6">❤️ My Favourites</h1>
        {loading && <p className="text-gray-500">Loading...</p>}
        <div className="flex flex-wrap gap-4">
          {favourites.map(movie => (
            <div
              key={movie.imdbID}
              onClick={() => navigate(`/movie/${movie.imdbID}`)}
              className={`cursor-pointer rounded-lg overflow-hidden w-40 shadow-md hover:shadow-xl transition-shadow ${
                theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
              }`}
            >
              <img src={movie.poster} alt={movie.title} className="w-full" />
              <div className="p-2">
                <h3 className="font-bold text-sm">{movie.title}</h3>
                <p className="text-xs text-gray-400">{movie.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Favourites