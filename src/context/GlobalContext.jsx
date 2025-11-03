import React from "react";
import axios from "axios";
import useBoardgame from "../assets/customhooks/useBoardgame";
import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const boardgameHook = useBoardgame();
    const [search, setSearch] = useState("");
    const [debounceSearch, setDebounceSearch] = useState("");   

    //stati per il modale di modifica
    const [showModal, setShowModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isNew, setIsNew] = useState(false);

    //ricerca con debounce
    useEffect(() => {
        const timeout = setTimeout(()=>{
            setDebounceSearch(search);
        }, 400);
        return () => clearTimeout(timeout)
    }, [search]);

    //funzioni di gestione del modale
     function openEditModal(game) {
        setSelectedGame(game);
        setIsNew(false);
        setShowModal(true);
    }

     function openAddModal() {
        setSelectedGame({ 
            title: "", 
            category: "", 
            release_year: "", 
            price: "" 
        });
        setIsNew(true);
        setShowModal(true);
    }

       function closeModal() {
        setShowModal(false);
        setSelectedGame(null);
    }

    //global context anche per la ricerca per averla a disposizione quando serve
    return (
        <GlobalContext.Provider value={
            {  ...boardgameHook,
            search,
            setSearch,
            debounceSearch,
            showModal,
            selectedGame,
            isNew,
            openEditModal,
            openAddModal,
            closeModal,
            setShowModal,
            setSelectedGame
            }}>
            {children}
        </GlobalContext.Provider>
    )
}


export { GlobalContext, GlobalProvider }