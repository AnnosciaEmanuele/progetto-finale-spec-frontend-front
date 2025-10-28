import React from "react";
import { Link } from "react-router-dom"
import HoldButton from "./HoldButton";

function TableRow({ boardgame, onEdit, onDelete }) {

  return (
    <tr>
      <td>
        <Link to={`/boardgames/${boardgame.id ?? boardgame._id}`}>
          {boardgame.title}
        </Link>
      </td>
      <td >{boardgame.category}</td>
      <td className="d-flex gap-2 justify-content-end">
        <button
          onClick={() => onEdit(boardgame)}
          className="btn btn-light "
        >
          <i className="fa fa-pencil"></i>
        </button>

        <HoldButton
          label={<i className="fa fa-trash"></i>}
          holdTime={2000}
          onHoldComplete={() => onDelete(boardgame)}
        />
      </td>
    </tr>
  );
}

export default React.memo(TableRow);