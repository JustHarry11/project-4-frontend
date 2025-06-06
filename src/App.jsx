import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar/Navbar"

import BoardgameIndex from "./components/BoardgameIndex/BoardgameIndex"
import BoardgameShow from "./components/BoardgameShow/BoardgameShow"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/boardgames" element={<BoardgameIndex />} />
        <Route path="/boardgames/:boardgameId" element={<BoardgameShow />} />
      </Routes>
    </>
  )
}

export default App
