import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar/Navbar"

import BoardgameIndex from "./components/BoardgameIndex/BoardgameIndex"
import BoardgameShow from "./components/BoardgameShow/BoardgameShow"
import BoardgameCreate from "./components/BoardgameCreate/BoardgameCreate"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/boardgames" element={<BoardgameIndex />} />
        <Route path="/boardgames/:boardgameId" element={<BoardgameShow />} />
        <Route path="/boardgames/new" element={<BoardgameCreate />} />
      </Routes>
    </>
  )
}

export default App
