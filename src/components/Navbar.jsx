import { NavLink, useNavigate, Link } from "react-router-dom";
import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";

function Navbar() {
    const { search, setSearch, selectedCategory, boardgames, setSelectedCategory } = useContext(GlobalContext);
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/");
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                {/* Logo */}
                <Link className="navbar-brand" to="/">
                    🎲 Boardgames
                </Link>
                
                {/* Burger Button */}
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarContent"
                    aria-controls="navbarContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                {/* Collapsible content */}
                <div className="collapse navbar-collapse" id="navbarContent">
                    {/* Links */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">
                                📋 Lista
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/preferiti" className="nav-link">
                                ❤️ Preferiti
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/confronto" className="nav-link">
                                🆚 Confronta
                            </NavLink>
                        </li>
                    </ul>

                    {/* Search Form */}
                    <form className="d-flex flex-column flex-lg-row gap-2" onSubmit={handleSubmit}>
                        <input 
                            className="form-control" 
                            type="search"
                            placeholder="Cerca gioco..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)} 
                        />
                        <select
                            className="form-select"
                            style={{ minWidth: "150px" }}
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="">Tutte le categorie</option>
                            {[...new Set(boardgames.filter(bg => bg?.category).map(bg => bg.category))].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default React.memo(Navbar);