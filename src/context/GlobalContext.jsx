import React from "react";
import axios from "axios";
import useBoardgame from "../assets/customhooks/useBoardgame";
import { createContext } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const boardgameHook = useBoardgame();


    return (
        <GlobalContext.Provider value={boardgameHook}>
            {children}
        </GlobalContext.Provider>
    )
}


export { GlobalContext, GlobalProvider }