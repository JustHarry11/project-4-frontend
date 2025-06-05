import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar/Navbar"

import BoardgamesIndex from "./components/BoardgameIndex/BoardgameIndex"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/boardgames" element={<BoardgamesIndex />} />
      </Routes>
    </>
  )
}

export default App
