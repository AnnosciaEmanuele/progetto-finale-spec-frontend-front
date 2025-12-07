import { Link } from "react-router-dom"
import "./CSS/404NotFound.css"

import { useNavigate } from "react-router-dom"

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="container notfound-box">
                <h1 className="notfound-title m-bottom">Ti sei perso? ⛔️ </h1>
                <p className="notfound-p m-bottom">La pagina che stai cercando non esiste</p>
                <div className="notfound-btn-box">
                    <Link className="notfound-btn btn1" to={"/"}>Torna alla Home</Link>
                    <Link className="notfound-btn btn2" onClick={()  => navigate(-1)}>Torna alla pagina precedente</Link>
                </div>
            </div>
        </>
    )
}

export default NotFound