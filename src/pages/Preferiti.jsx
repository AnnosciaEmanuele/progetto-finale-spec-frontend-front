import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

function Preferiti() {
    const { favorites, toggleFavorite } = useContext(GlobalContext);

    if (favorites.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Nessun preferito ancora</h2>
                <p>Aggiungi un gioco cliccando il cuore!</p>
                <Link to="/" className="btn btn-primary mt-3">
                    Torna alla lista
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">I tuoi preferiti </h2>
            <div className="row">
                {favorites.map((game) => (
                    <div className="col-12 col-md-6 col-lg-4 mb-3" key={game.id ?? game._id}>
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">{game.title}</h4>
                                <p className="card-text"><strong>Categoria:</strong> {game.category}</p>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => toggleFavorite(game)}
                                >
                                    Rimuovi ❤️
                                </button>
                                <Link
                                    to={`/boardgames/${game.id}`}
                                    className="btn btn-outline-primary ms-2"
                                >
                                    Dettagli
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Preferiti;
