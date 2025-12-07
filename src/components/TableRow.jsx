import React from "react";
import { Link } from "react-router-dom";
import HoldButton from "./HoldButton";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

function TableRow({ boardgame, onDelete }) {
  const { favorites, toggleFavorite, compareList, addToCompare, removeFromCompare } = useContext(GlobalContext);

  const isFav = favorites.some(f => (f.id ?? f._id) === (boardgame.id ?? boardgame._id));
  const isInCompare = compareList.some(c => (c.id ?? c._id) === (boardgame.id ?? boardgame._id));

  function handleCompareToggle() {
    if (isInCompare) {
      removeFromCompare(boardgame);
    } else {
      addToCompare(boardgame);
    }
  }

  return (
    <tr>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>
          {boardgame.title}
        </Link>
      </td>
      <td>{boardgame.category}</td>

      <td className="d-flex gap-2 justify-content-end">
        {/* Bottone preferiti */}
        <button
          className={`btn btn-sm ${isFav ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => toggleFavorite(boardgame)}
          title={isFav ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        {/* Bottone confronta con toggle */}
        <button
          className={`btn btn-sm ${isInCompare ? "btn-secondary" : "btn-outline-secondary"}`}
          onClick={handleCompareToggle}
          title={isInCompare ? "Rimuovi dal confronto" : "Aggiungi al confronto"}
        >
          {isInCompare ? " ✓ " : "🆚"}
        </button>

        <HoldButton
          label={<i className="fa fa-trash"></i>}
          holdTime={1500}
          onHoldComplete={() => onDelete(boardgame)}
        />
      </td>
    </tr>
  );
}

export default React.memo(TableRow);