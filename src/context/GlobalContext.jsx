import useBoardgame from "../assets/customhooks/useBoardgame";
import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
    const boardgameHook = useBoardgame();

    //state per la ricerca
    const [search, setSearch] = useState("");
    const [debounceSearch, setDebounceSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    //stati per il modale di modifica
    const [showModal, setShowModal] = useState(false);
    const [selectedGame, setSelectedGame] = useState(null);
    const [isNew, setIsNew] = useState(false);

     // Persistenza local storage - Preferiti
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    // Persistenza local storage - Confronto
    const [compareList, setCompareList] = useState(() => {
        const saved = localStorage.getItem("compareList");
        return saved ? JSON.parse(saved) : [];
    });

      // Salva preferiti in localStorage quando cambiano
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    // Salva confronto in localStorage quando cambia
    useEffect(() => {
        localStorage.setItem("compareList", JSON.stringify(compareList));
    }, [compareList]);


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

    async function handleSave(game) {
    try {
        await updateBoardgame(game);
        closeModal();
    } catch (err) {
        alert("Errore durante il salvataggio: " + err.message);
    }
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

    //------COMPARATORE----
    // Aggiungi al comparatore
    function addToCompare(game) {
        const id = game.id ?? game._id;
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
            handleSave
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


export { GlobalContext, GlobalProvider }