import { useState, useEffect, useRef } from "react";
import Modal from "./Modal";
import React from "react";

function EditModal({ show, onClose, boardgame, onSave, isNew = false }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [price, setPrice] = useState("");

  const formRef = useRef(null);

  useEffect(() => {
    if (boardgame) {
      setTitle(boardgame.title || "");
      setCategory(boardgame.category || "");
      setReleaseYear(boardgame.release_year || "");
      setPrice(boardgame.price || "");
    }
  }, [boardgame]);

  function handleSubmit(e) {
    e.preventDefault();

    const updatedBoardgame = {
      title: title.trim(),
      category: category.trim(),
      release_year: releaseYear ? parseInt(releaseYear) : undefined,
      price: price ? parseFloat(price) : undefined,
    };

    // Se non è nuovo, aggiungi l'id
    if (!isNew && boardgame) {
      updatedBoardgame.id = boardgame.id ?? boardgame._id;
    }

    //chiusura del modale
    if (onClose) onClose();

    console.log("Dati dal form prima di inviare:", updatedBoardgame);
    onSave(updatedBoardgame);

  }

  return (
    <Modal
      title={isNew ? "Aggiungi Nuovo Gioco" : "Modifica Gioco"}
      show={show}
      onClose={onClose}
      onConfirm={() => formRef.current?.requestSubmit()}
      content={
        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Titolo</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Categoria</label>
            <input
              type="text"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Anno di uscita</label>
            <input
              type="number"
              className="form-control"
              value={releaseYear}
              onChange={(e) => setReleaseYear(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Prezzo (€)</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
            />
          </div>
        </form>
      }
    />
  );
}

export default React.memo(EditModal);