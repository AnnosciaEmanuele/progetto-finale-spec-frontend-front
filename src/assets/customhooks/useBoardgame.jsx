import axios from "axios";
import { useReducer, useEffect } from "react";

const BASE_URL = "http://localhost:3001/boardgames";

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
                boardgames: state.boardgames.filter((boardgame) => boardgame.id !== action.payload)
            };
        case "UPDATE_BOARDGAME":
            return {
                ...state,
                boardgames: state.boardgames.map((boardgame) => 
                    boardgame.id === action.payload.id ? action.payload : boardgame
                )
            };
        default:
            return state;
    }
}

function useBoardgame() {
    const [state, dispatch] = useReducer(boardgamesReducer, initialState);

    useEffect(() => {
        axios.get(BASE_URL)
            .then(async (res) => {
                const boardgameList = res.data;
                
                dispatch({ type: "FETCH_SUCCESS", payload: boardgameList });
            })
            .catch((err) => {
                dispatch({ type: "FETCH_ERROR", payload: err });
            });
    }, []);

    async function addBoardgame(boardgame) {
        try {
            const res = await axios.post(BASE_URL, boardgame);
            dispatch({ type: "ADD_BOARDGAME", payload: res.data });
        } catch (err) {
            console.error("Errore nell'aggiunta:", err);
            throw err.response?.data?.message 
                ? new Error(err.response.data.message) 
                : err;
        }
    }

    async function removeBoardgame(boardgameId) {
        try {
            await axios.delete(`${BASE_URL}/${boardgameId}`);
            dispatch({ type: "REMOVE_BOARDGAME", payload: boardgameId });
        } catch (err) {
            console.error("Errore nella rimozione:", err);
            throw err.response?.data?.message 
                ? new Error(err.response.data.message) 
                : err;
        }
    }

    async function updateBoardgame(updatedBoardgame) {
        try {
            const res = await axios.put(
                `${BASE_URL}/${updatedBoardgame.id}`, 
                updatedBoardgame
            );
            dispatch({ type: "UPDATE_BOARDGAME", payload: res.data });
        } catch (err) {
            console.error("Errore nella modifica:", err);
            throw err.response?.data?.message 
                ? new Error(err.response.data.message) 
                : err;
        }
    }

    return {
        boardgames: state.boardgames,
        loading: state.loading,
        error: state.error,
        addBoardgame,
        removeBoardgame,
        updateBoardgame
    };
}

export default useBoardgame;