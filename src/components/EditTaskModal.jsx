import { useState, useRef, useEffect } from "react"
import HoldButton from "./HoldButton"
import style from "./EditTaskModal.module.css"
import ReactDOM from "react-dom"
import Modal from "./Modal"


function EditTaskModal({ show, onClose, task, onSave }) {
    const [title, setTitle] = useState(boardgame.title);
    const [category, setCategory] = useState(boardgame.category);

    const formRef = useRef(null);

    useEffect(() => {
        setTitle(boardgame.title);
        setCategory(boardgame.category);
    }, [boardgame]);

    function handleSubmit(e) {
        e.preventDefault();


        const updatedBoardgame = {
            ...boardgame,
            title,
            category,
        };

        onSave(updatedBoardgame);
    };


    return (
        <Modal
            title="Modifica Gioco da Tavolo"
            show={show}
            onClose={onClose}
            confirmText="Salva"
            onConfirm={() => formRef.current.requestSubmit()}
            content={
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div>
                        <label>Titolo</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label>CAtegoria</label>
                        <textarea
                            value={description}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                    </div>
                </form>
            }
        />
    );
}


export default EditTaskModal 