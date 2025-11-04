import React from "react"
import { GlobalContext, GlobalProvider } from "./context/GlobalContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import BoardgameList from "./pages/BoardgameList"
import Preferiti from "./pages/Preferiti"
import BoardgameDetail from "./pages/BoardgameDetail"
import Confronto from "./pages/Confronto"

function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path = "/" element = {<BoardgameList />} />
            <Route path = "/preferiti" element = {<Preferiti />} />
            <Route path = "/boardgames/:id" element ={<BoardgameDetail />} />
            <Route path = "/confronto" element = {<Confronto />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
