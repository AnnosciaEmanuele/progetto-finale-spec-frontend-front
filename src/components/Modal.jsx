import React from "react";
import ReactDOM from "react-dom";

function Modal({ title, content, onClose, show, onConfirm }) {
  if (!show) return null;

  return ReactDOM.createPortal(
    <>
      <div 
        className="modal-backdrop fade show" 
        onClick={onClose}
      />
      <div 
        className="modal fade show" 
        tabIndex="-1" 
        style={{ display: 'block' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              {content}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Chiudi
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onConfirm}
              >
                Salva Modifiche
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

export default React.memo(Modal);