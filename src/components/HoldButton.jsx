import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function HoldButton({ onHoldComplete, holdTime = 2000, label, className = "" }) {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const handleMouseDown = () => {
    startTimeRef.current = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const percentage = Math.min((elapsed / holdTime) * 100, 100);
      setProgress(percentage);

      if (elapsed >= holdTime) {
        clearInterval(intervalRef.current);
        setProgress(0);
        onHoldComplete();
      }
    }, 20); // intervallo più fluido
  };

  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
    setProgress(0);
  };

  return (
    <div className="position-relative d-inline-block">
      {/* Bottone compatto */}
      <button
        type="button"
        className={`btn btn-danger btn-sm ${className} p-1`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ width: "32px", height: "32px" }} // dimensione compatta
      >
        {label}
      </button>

      {/* Progress bar sopra il bottone */}
      {progress > 0 && (
        <div
          className="progress position-absolute top-0 start-0"
          style={{
            height: "100%",
            width: "100%",
            pointerEvents: "none",
            borderRadius: "0.25rem",
            overflow: "hidden",
          }}
        >
          <div
            className="progress-bar bg-warning"
            role="progressbar"
            style={{ width: `${progress}%`, transition: "width 0.05s linear" }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default HoldButton;
