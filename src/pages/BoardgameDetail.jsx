import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

function BoardgameDetails() {
  const { id } = useParams();
  const { boardgames, loading, error } = useContext(GlobalContext);
  const navigate = useNavigate();

  // Gestione del loading
  if (loading) {
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

  // Gestione errore
  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Errore!</h4>
          <p>Si è verificato un errore: {error.message}</p>
        </div>
      </div>
    );
  }

  // Cerca il gioco per id (supporta sia id che _id)
  const boardgame = boardgames.find(
    (bg) => (bg.id ?? bg._id) === Number(id) || (bg.id ?? bg._id) === id
  );

  // Se il gioco non esiste
  if (!boardgame) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Gioco non trovato</h4>
          <p>Il gioco che stai cercando non esiste o è stato eliminato.</p>
          <button 
            className="btn btn-primary mt-3" 
            onClick={() => navigate("/boardgames")}
          >
            Torna alla lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2 className="mb-0">{boardgame.title}</h2>
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
                <strong>Prezzo:</strong> {boardgame.price ? `€ ${boardgame.price.toFixed(2)}` : "N/D"}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button 
            className="btn btn-secondary" 
            onClick={() => navigate("/boardgames")}
          >
            ← Torna alla lista
          </button>
        </div>
      </div>
    </div>
  );
}

export default BoardgameDetails;