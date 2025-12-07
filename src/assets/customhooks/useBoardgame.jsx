import { useEffect, useCallback, useReducer } from "react";

const initialState = {
    boardgames: [],
    loading: true,
    error: null,
};

function boardgamesReducer(state, action) {
    switch (action.type) {
        case "FETCH_SUCCESS":
            return { ...state, boardgames: action.payload, loading: false, error: null };
        case "FETCH_ERROR":
            return { ...state, boardgames: [], loading: false, error: action.payload };
        case "ADD_BOARDGAME":
            return { ...state, boardgames: [...state.boardgames, action.payload] };
        case "REMOVE_BOARDGAME":
            return {
                ...state,
                boardgames: state.boardgames.filter(
                    (boardgame) => (boardgame.id ?? boardgame._id) !== action.payload
                )
            };
        case "UPDATE_BOARDGAME":
            return {
                ...state,
                boardgames: state.boardgames.map((boardgame) =>
                    (boardgame.id ?? boardgame._id) === (action.payload.id ?? action.payload._id)
                        ? action.payload
                        : boardgame
                )
            };
        default:
            return state;
    }
}

function useBoardgame() {
    const [state, dispatch] = useReducer(boardgamesReducer, initialState);

    // Importo l'URL dal .env
    const urlList = import.meta.env.VITE_API_URL;

    // Chiamata API per tutta la lista
    const getBoardgamesList = useCallback(async () => {
        try {
           
            const response = await fetch(urlList);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(`Errore: ${response.status}`);
            }

            dispatch({ type: "FETCH_SUCCESS", payload: data });
            return data;
        } catch (error) {
            console.error("❌ Errore lista:", error);
            dispatch({ type: "FETCH_ERROR", payload: error });
            throw error;
        }
    }, [urlList]);

    // Chiamata API per il singolo gioco
   const getSingleBoardgame = useCallback(async (id) => {
    try {
        const url = `${urlList}/${id}`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(`Errore: ${response.status}`);
        }
        
        // ✅ IL BACKEND RESTITUISCE { success: true, boardgame: {...} }
        const boardgame = data.boardgame || data; // Prendi data.boardgame
        
        return boardgame; // ✅ Ritorna solo l'oggetto boardgame
    } catch (error) {
        console.error(`❌ Errore gioco ${id}:`, error);
        throw error;
    }
}, [urlList]);

    // CRUD - Create
    const addBoardgame = useCallback(async (newBoardgame) => {
        try {

            const response = await fetch(urlList, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newBoardgame)
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Errore dal backend:", errorData);
                throw new Error(errorData.message || "Errore nella creazione");
            }

            const dataCreated = await response.json();
            dispatch({ type: "ADD_BOARDGAME", payload: dataCreated });
            return dataCreated;
        } catch (error) {
            console.error("Errore aggiunta:", error.message);
            throw new Error(`Errore nella creazione: ${error.message}`);
        }
    }, [urlList]);

    // CRUD - Update
    const updateBoardgame = useCallback(async (updatedBoardgame) => {
        try {
            const boardgameId = updatedBoardgame.id ?? updatedBoardgame._id;

            const response = await fetch(`${urlList}/${boardgameId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedBoardgame)
            });

            if (!response.ok) {
                throw new Error(`Errore nella modifica: ${response.status}`);
            }

            const dataUpdated = await response.json();
            dispatch({ type: "UPDATE_BOARDGAME", payload: dataUpdated });
            return dataUpdated;
        } catch (error) {
            console.error("Errore modifica:", error.message);
            throw new Error(`Errore nella modifica: ${error.message}`);
        }
    }, [urlList]);

    // CRUD - Delete
    const removeBoardgame = useCallback(async (boardgameId) => {
        try {
            const response = await fetch(`${urlList}/${boardgameId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error(`Errore nell'eliminazione: ${response.status}`);
            }
            dispatch({ type: "REMOVE_BOARDGAME", payload: boardgameId });
            return true;
        } catch (error) {
            console.error("Errore eliminazione:", error.message);
            throw new Error(`Errore nell'eliminazione: ${error.message}`);
        }
    }, [urlList]);

    //Carica i dati all'avvio
    useEffect(() => {
        getBoardgamesList();
    }, [getBoardgamesList]);

    return {
        boardgames: state.boardgames,
        loading: state.loading,
        error: state.error,
        getBoardgamesList,
        getSingleBoardgame,
        addBoardgame,
        removeBoardgame,
        updateBoardgame
    };
}

export default useBoardgame;

