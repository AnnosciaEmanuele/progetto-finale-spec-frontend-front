import React from "react";
import axios from "axios";
import useBoardgame from "../assets/customhooks/useBoardgame";
import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const boardgameHook = useBoardgame();
    const [search, setSearch] = useState("");
    const [debounceSearch, setDebounceSearch] = useState("");   

    useEffect(() => {
        const timeout = setTimeout(()=>{
            setDebounceSearch(search);
        }, 400);
        return () => clearTimeout(timeout)
    }, [search]);

    return (
        <GlobalContext.Provider value={
            { ...boardgameHook,
                search,
                setSearch,
                debounceSearch,
            }}>
            {children}
        </GlobalContext.Provider>
    )
}


export { GlobalContext, GlobalProvider }