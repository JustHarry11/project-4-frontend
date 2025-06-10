import { Routes, Route, Navigate } from "react-router"
import Navbar from "./components/Navbar/Navbar"

import BoardgameIndex from "./components/BoardgameIndex/BoardgameIndex"
import BoardgameShow from "./components/BoardgameShow/BoardgameShow"
import BoardgameCreate from "./components/BoardgameCreate/BoardgameCreate"
import BoardgameUpdate from "./components/BoardgameUpdate/BoardgameUpdate"

import UserProfile from "./components/UserProfile/UserProfile"

import UserSignIn from "./components/UserSignIn/UserSignIn"
import UserSignUp from "./components/UserSignUp/UserSignUp"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate to='/boardgames' replace />} />
        
        <Route path="/boardgames" element={<BoardgameIndex />} />
        <Route path="/boardgames/:boardgameId" element={<BoardgameShow />} />
        <Route path="/boardgames/new" element={<BoardgameCreate />} />
        <Route path="/boardgames/:boardgameId/edit" element={<BoardgameUpdate />} />
        
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/signin" element={<UserSignIn />}/>
        <Route path="/signup" element={<UserSignUp />}/>
        
      </Routes>
    </>
  )
}

export default App
