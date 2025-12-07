import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function Confronto() {
    const {
        compareList,
        removeFromCompare,
        boardgames,
        addToCompare
    } = useContext(GlobalContext);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Confronta Giochi 🆚</h2>

            {/* menu a tendina per aggiungere altri giochi */}
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

            {compareList.length === 0 && (
                <div className="alert alert-info">
                    Nessun gioco selezionato. Aggiungine uno dalla lista 👇
                </div>
            )}

            <div className="table-responsive">
                <table className="table table-bordered text-center">
                    <thead className="table-secondary">
                        <tr>
                            <th>Caratteristica</th>
                            {compareList.map(g => (
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
                            <td>Categoria</td>
                            {compareList.map(g => <td key={g.title}>{g.category}</td>)}
                        </tr>
                        <tr>
                            <td>Anno di Rilascio</td>
                            {compareList.map(g => <td key={g.title}>{g.release_year}</td>)}
                        </tr>
                        <tr>
                            <td>Prezzo</td>
                            {compareList.map(g => <td key={g.title}>€ {g.price}</td>)}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Confronto;
