import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function Navbar() {
    const { search, setSearch } = useContext(GlobalContext)

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();

        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src="../src/assets/react.svg" alt="" /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                Lista dei Giochi da Tavolo
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/preferiti" className="nav-link">
                                Preferiti ❤️️
                            </NavLink>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit = {handleSubmit}>
                        <input className="form-control me-2" 
                        type="search" 
                        placeholder="Cerca qui..." 
                        aria-label="Search" 
                        value={search}
                        onChange = {(e) => setSearch(e.target.value)}/>
                    </form>
                </div>
            </div>
        </nav>
    )
}

export default Navbar