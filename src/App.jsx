import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ThemeContext from "./ThemeContext"
import Home from "./Home"
import MovieDetail from "./MovieDetail"

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
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  )
}

export default App