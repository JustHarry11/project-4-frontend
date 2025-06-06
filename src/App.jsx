import { Routes, Route } from "react-router"
import Navbar from "./components/Navbar/Navbar"

import BoardgameIndex from "./components/BoardgameIndex/BoardgameIndex"
import BoardgameShow from "./components/BoardgameShow/BoardgameShow"
import BoardgameCreate from "./components/BoardgameCreate/BoardgameCreate"
import BoardgameUpdate from "./components/BoardgameUpdate/BoardgameUpdate"

import UserSignIn from "./components/UserSignIn/UserSignIn"
import UserSignUp from "./components/UserSignUp/UserSignUp"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/boardgames" element={<BoardgameIndex />} />
        <Route path="/boardgames/:boardgameId" element={<BoardgameShow />} />
        
        
        <Route path="/boardgames/new" element={<BoardgameCreate />} />
        <Route path="/boardgames/:boardgameId/edit" element={<BoardgameUpdate />} />

        <Route path="/signin" element={<UserSignIn />}/>
        <Route path="/signup" element={<UserSignUp />}/>
        
      </Routes>
    </>
  )
}

export default App
