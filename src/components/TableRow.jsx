import React from "react";
import { Link } from "react-router-dom"

function TableRow({ boardgame }) {

  return (
    <tr>
      <td>
        <Link to={`/boardgames/${boardgame.id ?? boardgame._id}`}>
          {boardgame.title}
        </Link>
      </td>
      <td >{boardgame.category}</td>
      <td>{boardgame.price}</td>
      <td>{boardgame.realease_year}</td>
    </tr>
  );
}

export default React.memo(TableRow);