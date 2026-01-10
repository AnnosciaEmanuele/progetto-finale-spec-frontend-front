import { Link, useNavigate } from "react-router-dom"

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
            <div className="text-center">
                <h1 className="display-1 fw-bold text-danger">404</h1>
                <h2 className="mb-3">Ti sei perso?</h2>
                <p className="lead text-muted mb-4">La pagina che stai cercando non esiste</p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <Link className="btn btn-primary btn-lg" to="/">
                        Torna alla Home
                    </Link>
                    <button className="btn btn-outline-secondary btn-lg" onClick={() => navigate(-1)}>
                        Pagina precedente
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
