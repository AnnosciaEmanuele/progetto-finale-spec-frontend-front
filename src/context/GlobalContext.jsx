import React from "react";
import axios from "axios";
import useBoardgame from "../assets/customhooks/useBoardgame";
import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const boardgameHook = useBoardgame();
    const [search, setSearch] = useState("");
    const [debounceSearch, setDebounceSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    //stati per il modale di modifica
    const [showModal, setShowModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isNew, setIsNew] = useState(false);

    //aggiunta preferiti/confronto
    const [favorites, setFavorites] = useState([]);
    const [compareList, setCompareList] = useState([]);


    //ricerca con debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
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

    // Toggle preferiti
    function toggleFavorite(game) {
        const id = game.id ?? game._id;
        if (favorites.some(f => (f.id ?? f._id) === id)) {
            setFavorites(favorites.filter(f => (f.id ?? f._id) !== id));
        } else {
            setFavorites([...favorites, game]);
        }
    }

    // Aggiungi al comparatore
    function addToCompare(game) {
        const id = game.id ?? game._id;

        // massimo 2

        // evita duplicati
        if (!compareList.some(item => (item.id ?? item._id) === id)) {
            setCompareList([...compareList, game]);
        }
    }

    // Rimuovi dal comparatore
    function removeFromCompare(game) {
        const id = game.id ?? game._id;
        setCompareList(compareList.filter(item => (item.id ?? item._id) !== id));
    }

    //global context anche per la ricerca per averla a disposizione quando serve
    return (
        <GlobalContext.Provider value={{
            ...boardgameHook,
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
            setSelectedGame,
            favorites,
            toggleFavorite,
            compareList,
            addToCompare,
            removeFromCompare,
            selectedCategory,
            setSelectedCategory,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export { GlobalContext, GlobalProvider }