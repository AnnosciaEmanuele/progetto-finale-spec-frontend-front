import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";

function Confronto() {
    const {
        compareList,
        removeFromCompare,
        boardgames,
        addToCompare,
        getSingleBoardgame,
    } = useContext(GlobalContext);

    const [detailedGames, setDetailedGames] = useState([]);
    const [loading, setLoading] = useState(false);

    //Carica i dettagli completi di tutti i giochi nel confronto
    useEffect(() => {
        async function loadAllDetails() {
            if (compareList.length === 0) {
                setDetailedGames([]);
                return;
            }

            try {
                setLoading(true);

                // Carica dettagli per ogni gioco
                const details = await Promise.all(
                    compareList.map(async (game) => {
                        try {
                            const fullData = await getSingleBoardgame(game.id ?? game._id);
                            return fullData;
                        } catch (err) {
                            console.error(`❌ Errore caricamento ${game.title}:`, err);
                            return game; // Fallback ai dati base
                        }
                    })
                );

                setDetailedGames(details);
            } catch (err) {
                console.error("❌ Errore generale:", err);
            } finally {
                setLoading(false);
            }
        }

        loadAllDetails();
    }, [compareList, getSingleBoardgame]);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Confronta Giochi 🆚</h2>

            {/* Menu a tendina per aggiungere giochi */}
            {boardgames.length > 0 && (
                <div className="mb-4">
                    <label className="form-label fw-bold">
                        Aggiungi un gioco al confronto:
                    </label>
                    <select
                        className="form-select"
                        onChange={(e) => {
                            const gameId = e.target.value;
                            if (!gameId) return;
                            const selected = boardgames.find(
                                bg => (bg.id ?? bg._id).toString() === gameId
                            );
                            addToCompare(selected);
                            e.target.value = ""; // Reset selezione
                        }}
                    >
                        <option value="">Seleziona gioco...</option>
                        {boardgames
                            .filter(bg =>
                                !compareList.some(c => (c.id ?? c._id) === (bg.id ?? bg._id))
                            )
                            .map(bg => (
                                <option key={bg.id ?? bg._id} value={bg.id ?? bg._id}>
                                    {bg.title}
                                </option>
                            ))}
                    </select>
                </div>
            )}

            {/* Alert lista vuota */}
            {compareList.length === 0 && (
                <div className="alert alert-info">
                    Nessun gioco selezionato. Aggiungine uno dalla lista o dal menu a tendina sopra 👆
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div className="text-center my-4">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Caricamento dettagli...</span>
                    </div>
                </div>
            )}

            {/* Tabella confronto */}
            {detailedGames.length > 0 && !loading && (
                <div className="table-responsive">
                    <table className="table table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th>Caratteristica</th>
                                {detailedGames.map(g => (
                                    <th key={g.id ?? g._id}>
                                        {g.title}
                                        <button
                                            className="btn btn-sm btn-danger ms-2"
                                            onClick={() => removeFromCompare(g)}
                                        >
                                            ✖
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Categoria</strong></td>
                                {detailedGames.map(g => (
                                    <td key={`cat-${g.id}`}>
                                        <span className="badge bg-secondary">{g.category}</span>
                                    </td>
                                ))}
                            </tr>
                            <tr>
                                <td><strong>Anno di Rilascio</strong></td>
                                {detailedGames.map(g => (
                                    <td key={`year-${g.id}`}>{g.release_year || "N/D"}</td>
                                ))}
                            </tr>
                            <tr>
                                <td><strong>Prezzo</strong></td>
                                {detailedGames.map(g => (
                                    <td key={`price-${g.id}`}>
                                        {g.price ? `€ ${g.price.toFixed(2)}` : "N/D"}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default Confronto;
