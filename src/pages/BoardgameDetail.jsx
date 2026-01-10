import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import EditModal from "../components/EditModal";

function BoardgameDetails() {
    const { id } = useParams();
    const {
        getSingleBoardgame,
        loading,
        openEditModal,
        showModal,
        closeModal,
        selectedGame,
        updateBoardgame,
        toggleFavorite,
        favorites,
        addToCompare,
        removeFromCompare,
        compareList,
    } = useContext(GlobalContext);
    
    const navigate = useNavigate();
    const [boardgame, setBoardgame] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(true);

    //Carica i dettagli del singolo gioco
    useEffect(() => {
    async function loadDetail() {
        try {
            setLoadingDetail(true);
            const data = await getSingleBoardgame(id);
            setBoardgame(data);

        } catch (err) {
            console.error("Errore caricamento dettagli:", err);
        } finally {
            setLoadingDetail(false);
        }
    }
    
    if (id) {
        loadDetail();
    }
}, [id, getSingleBoardgame]);

    async function handleSave(game) {
        try {
            await updateBoardgame(game);
            // Ricarica i dettagli aggiornati
            const updated = await getSingleBoardgame(id);
            setBoardgame(updated);
            closeModal();
        } catch (err) {
            alert("Errore durante il salvataggio: " + err.message);
        }
    }

    const isFav = boardgame ? favorites.some(f => (f.id ?? f._id) === (boardgame.id ?? boardgame._id)) : false;
    const isInCompare = boardgame ? compareList.some(c => (c.id ?? c._id) === (boardgame.id ?? boardgame._id)) : false;

    if (loadingDetail || loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </div>
                    <p className="mt-3">Caricamento dettagli gioco...</p>
                </div>
            </div>
        );
    }

    if (!boardgame) {
        return (
            <div className="container mt-5">
                <div className="alert alert-warning" role="alert">
                    <h4 className="alert-heading">Gioco non trovato</h4>
                    <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
                        Torna alla lista
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                    <h2 className="mb-0">{boardgame.title}</h2>
                    <button onClick={() => openEditModal(boardgame)} className="btn btn-light">
                        <i className="fa fa-pencil"></i> Modifica
                    </button>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="mb-3">
                                <strong>Categoria:</strong>
                                <span className="badge bg-secondary ms-2">{boardgame.category}</span>
                            </p>
                        </div>
                        <div className="col-md-6">
                            <p className="mb-3">
                                <strong>Anno di Rilascio:</strong> {boardgame.release_year || "N/D"}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <p className="mb-3">
                                <strong>Prezzo:</strong> {boardgame.price ? `€ ${boardgame.price}` : "N/D"}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button
                        className={`btn me-2 ${isFav ? "btn-danger" : "btn-outline-danger"}`}
                        onClick={() => toggleFavorite(boardgame)}
                    >
                        {isFav ? "❤️ Rimuovi dai preferiti" : "🤍 Aggiungi ai preferiti"}
                    </button>
                    <button 
                        className={`btn me-2 ${isInCompare ? "btn-success" : "btn-outline-primary"}`}
                        onClick={() => isInCompare ? removeFromCompare(boardgame) : addToCompare(boardgame)}
                    >
                        {isInCompare ? "✓ Aggiunto al confronto" : "🆚 Confronta"}
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate("/")}>
                        ← Torna alla lista
                    </button>
                </div>
            </div>
            
            <EditModal
                show={showModal}
                onClose={closeModal}
                boardgame={selectedGame}
                onSave={handleSave}
                isNew={false}
            />
        </div>
    );
}

export default BoardgameDetails;