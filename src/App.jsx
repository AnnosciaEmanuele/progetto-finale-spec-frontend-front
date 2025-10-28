import React from "react"
import { GlobalContext, GlobalProvider } from "./context/GlobalContext"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import BoardgameList from "./pages/BoardgameList"
import Preferiti from "./pages/Preferiti"

function App() {


  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path = "/" element = {<BoardgameList />} />
            <Route path = "/preferiti" element = {<Preferiti />} />
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
