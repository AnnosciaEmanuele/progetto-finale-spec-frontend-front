import React from "react";
import { Link } from "react-router-dom"
import HoldButton from "./HoldButton";
import { GlobalContext } from "../context/GlobalContext";
import { useContext } from "react";

function TableRow({ boardgame, onEdit, onDelete }) {
  const { favorites, toggleFavorite, addToCompare } = useContext(GlobalContext);

  const isFav = favorites.some(f => (f.id ?? f._id) === (boardgame.id ?? boardgame._id));

  return (
    <tr>
      <td>
        <Link to={`/boardgames/${boardgame.id}`}>
          {boardgame.title}
        </Link>
      </td>
      <td >{boardgame.category}</td>

      <td className="d-flex gap-2 justify-content-end">

        {/* Bottone preferiti */}
        <button
          className={`btn ${isFav ? "btn-warning" : "btn-outline-warning"}`}
          onClick={() => toggleFavorite(boardgame)}
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        {/* Confronta */}
        <button
          className="btn btn-outline-secondary"
          onClick={() => addToCompare(boardgame)}
        >
          🆚
        </button>

        <HoldButton
          label={<i className="fa fa-trash"></i>}
          holdTime={1500}
          onHoldComplete={() => onDelete(boardgame)}
        />
      </td>
    </tr >
  );
}

export default React.memo(TableRow);