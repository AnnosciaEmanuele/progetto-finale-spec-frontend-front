import React, { useContext, useEffect, useState, useMemo } from "react";
import { GlobalContext } from "../context/GlobalContext";
import TableRow from "../components/TableRow";


function BoardgameList() {
  const { boardgames, loading, error } = useContext(GlobalContext);

  useEffect(() => {
    console.log("Boardgames dal context:", boardgames);
    console.log("Primo gioco:", boardgames[0]); 
  }, [boardgames, loading, error]);

  //gestione del loading
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

  //gestione error
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

  //gestione boardgames
  if (!boardgames || boardgames.length === 0) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info" role="alert">
          <p className="mb-0">Nessun gioco da tavolo trovato. Aggiungi il primo!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h1 className="my-4 text-center">LISTA DEI GIOCHI DA TAVOLO</h1>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">Titolo</th>
            <th scope="col">Categoria</th>
            <th scope="col">Prezzo</th>
            <th scope="col">Anno Uscita</th>
          </tr>
        </thead>
        <tbody>
          {boardgames.map((boardgame) => (
            <TableRow key={boardgame.id} boardgame={boardgame} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BoardgameList;