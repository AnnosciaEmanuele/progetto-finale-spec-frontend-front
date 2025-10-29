import React from "react";
import ReactDOM from "react-dom"


function Modal({ title, category, content, onClose, show, onConfirm }) {
    if (!show) return null;

    return ReactDOM.createPortal(
        <>
            <div className ="modal" tabindex="-1" >
                <div className ="modal-dialog">
                    <div className ="modal-content">
                        <div className ="modal-header">
                            <h5 className ="modal-title">{title}</h5>
                            <button type="button" 
                            className ="btn-close" 
                            data-bs-dismiss="modal" 
                            aria-label="Close"
                            onClick = {onClose}
                            ></button>
                        </div>
                        <div className ="modal-body">
                            {content}
                        </div>
                        <div className ="modal-footer">
                            <button 
                            type="button" 
                            className ="btn btn-primary"
                            onClick = {onConfirm}
                            >
                            Salva Modifiche
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;