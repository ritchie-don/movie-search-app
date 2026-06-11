import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ThemeContext from "./ThemeContext"
import Home from "./Home"
import MovieDetail from "./MovieDetail"
import Auth from "./Auth"
import Favourites from "./Favourites"


function App() {
  const [theme, setTheme] = useState("light")

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App