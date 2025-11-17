import React, { useContext, useEffect, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TableRow from "../components/TableRow";
import EditModal from "../components/EditModal";

function BoardgameList() {
  const {
    boardgames,
    loading,
    error,
    debounceSearch,
    addBoardgame,
    updateBoardgame,
    removeBoardgame,
    showModal,
    selectedGame,
    isNew,
    openEditModal,
    openAddModal,
    closeModal,
    selectedCategory,
    setSelectedCategory,
    loadBoardGames,
  } = useContext(GlobalContext);

  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState(1);

  //-------funzioni di ordinamento-------
  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder((prev) => prev * -1);
    } else {
      setSortBy(column);
      setSortOrder(1);
    }
  }

  //filtrato ed ordinato
  const filteredAndSorted = useMemo(() => {

    let filteredGames = boardgames.filter(g => {
      const matchesSearch = g?.title?.toLowerCase().includes(debounceSearch.toLowerCase());
      const matchesCategory = !selectedCategory || g?.category === selectedCategory;

      console.log(`Game: ${g.title} | Category: ${g.category} | Selected: ${selectedCategory} | Matches: ${matchesCategory}`);

      return matchesSearch && matchesCategory;
    });

    return [...filteredGames].sort((a, b) => {
      let result = 0;
      if (sortBy === "title") {
        result = a.title.localeCompare(b.title);
      } else if (sortBy === "category") {
        result = a.category.localeCompare(b.category);
      }
      return result * sortOrder;
    });
  }, [boardgames, sortBy, sortOrder, debounceSearch, selectedCategory]);

  useEffect(() => {
    console.log("Boardgames dal context:", boardgames);
  }, [boardgames]);

  //funzioni di modiffica
  function handleEdit(game) {
    openEditModal(game);
  }

  function handleAdd() {
    openAddModal();
  }

  function handleClose() {
    closeModal();
  }

  //cancellazione gioco
  async function handleDelete(game) {

    try {
      await removeBoardgame(game.id ?? game._id);
    } catch (err) {
      alert("Errore durante l'eliminazione: " + err.message);
    }
  }

  //salvataggio del gioco
  async function handleSave(game) {
    // Validazione
    if (!game.title || game.title.trim().length < 2) {
      alert("Il titolo deve avere almeno 2 caratteri");
      return;
    }

    if (!game.category || game.category.trim().length < 2) {
      alert("La categoria deve avere almeno 2 caratteri");
      return;
    }

    try {
      console.log("Dati da salvare:", game);

      if (isNew) {
        await addBoardgame(game);
        //await loadBoardGames()
      } else {
        await updateBoardgame(game);
      }

      closeModal();

    } catch (err) {
      console.error("Errore completo:", err);
      alert("Errore durante il salvataggio: " + (err.message || "Errore sconosciuto"));
    }
  }

  //gestione caricamenti
  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Caricamento...</span>
          </div>
          <p className="mt-3">Caricamento giochi da tavolo...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Errore!</h4>
          <p>Si è verificato un errore nel caricamento dei dati: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!boardgames || boardgames.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <p className="mb-0">Nessun gioco da tavolo trovato. Aggiungi il primo!</p>
        </div>
        <div className="text-center">
          <button className="btn btn-success" onClick={handleAdd}>
            ➕ Aggiungi Gioco
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="my-4 text-center">LISTA DEI GIOCHI DA TAVOLO</h1>
      <div className="text-center mb-4">
        <button className="btn btn-success" onClick={handleAdd}>
          ➕ Aggiungi Gioco
        </button>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 offset-md-3">
          <label className="form-label fw-bold">Filtra per categoria:</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tutte le categorie</option>
            {[...new Set(boardgames.map(bg => bg.category))].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredAndSorted.length === 0 && (debounceSearch || selectedCategory) && (
        <div className="alert alert-info text-center mt-4">
          Nessun gioco trovato
          {debounceSearch && <> con la ricerca: <strong>{debounceSearch}</strong></>}
          {selectedCategory && <> nella categoria: <strong>{selectedCategory}</strong></>}
        </div>
      )}

      {filteredAndSorted.length > 0 && (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th onClick={() => handleSort("title")} style={{ cursor: "pointer" }}>
                Nome {sortBy === "title" ? (sortOrder === 1 ? "⬆️" : "⬇️") : null}
              </th>
              <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
                Categoria {sortBy === "category" ? (sortOrder === 1 ? "⬆️" : "⬇️") : null}
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSorted.map((boardgame) => (
              <TableRow
                key={boardgame.id ?? boardgame._id}
                boardgame={boardgame}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}

      <EditModal
        show={showModal}
        onClose={handleClose}
        boardgame={selectedGame}
        onSave={handleSave}
        isNew={isNew}
      />
    </div>
  );
}

export default BoardgameList;