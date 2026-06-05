import { useContext } from "react"
import ThemeContext from "./ThemeContext"

function About() {
  const { theme } = useContext(ThemeContext)

  const styles = {
    backgroundColor: theme === "light" ? "white" : "black",
    color: theme === "light" ? "black" : "white",
    height: "100vh",
    padding: "20px"
  }

  return (
    <div style={styles}>
      <h1>About Page</h1>
      <p>Current theme: {theme}</p>
    </div>
  )
}

export default About