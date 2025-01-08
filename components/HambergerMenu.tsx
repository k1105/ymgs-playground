import { useState } from "react";

export const HambergerMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
      <p
        className="toggle-button"
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
      >
        {isOpen ? "Hide" : "Show"}
      </p>
      <div className={`container ${isOpen && "active"}`}>
        <p>morita asuka</p>
        <p>森田 明日香</p>
        <div className="work-list">
          <div>
            <p>きりもちの所在</p>
          </div>
          <div>
            <p>Observing Variation: in Sliced Loin Hams</p>
          </div>
          <div>
            <p>Lag</p>
          </div>
          <div>
            <p>Gap</p>
          </div>
          <div>
            <p>minim</p>
          </div>
        </div>
      </div>
      <style jsx>{`
        .toggle-button {
          position: fixed;
          top: 1rem;
          right: 1rem;
          z-index: 999;
          background: white;
          color: black;
          padding: 0.5rem;
          border-radius: 5px;
          width: 5rem;
          text-align: center;
          border: 1px solid #ccc;
        }
        .container {
          position: fixed;
          top: 0;
          left: 0;
          z-index: 990;
          width: 100vw;
          height: 100vh;
          opacity: 0;
          pointer-events: none;
          transition: all 1s ease;
          background: white;
        }

        .container.active {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>
    </>
  );
};
