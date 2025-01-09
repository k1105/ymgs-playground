import { SetStateAction, useState, Dispatch, RefObject } from "react";
import { RoundAutorenew } from "./icones/RoundAutoRenew";
import Link from "next/link";

export const HambergerMenu = ({
  setJaIndex,
  setEnIndex,
  jaFontRef,
  enFontRef,
}: {
  setJaIndex: Dispatch<SetStateAction<number>>;
  setEnIndex: Dispatch<SetStateAction<number>>;
  jaFontRef: RefObject<HTMLParagraphElement | null>;
  enFontRef: RefObject<HTMLParagraphElement | null>;
}) => {
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
        <div className="name-container">
          <p className="ja">morita asuka</p>
          <p className="en">森田 明日香</p>
        </div>

        <div className="work-list">
          <div className="work-title-container">
            <Link
              href={"/only-text"}
              className="link"
              style={{ textDecoration: "none", color: "black" }}
            >
              きりもちの所在<span className="year">(2024)</span>
            </Link>
          </div>
          <div className="work-title-container">
            <p>
              <s>Observing Variation: in Sliced Loin Hams</s>
              <span className="year">(2023)</span>
            </p>
          </div>
          <div className="work-title-container">
            <p>
              <s>Lag</s>
              <span className="year">(2022)</span>
            </p>
          </div>
          <div className="work-title-container">
            <p>
              <s>Gap</s>
              <span className="year">(2021)</span>
            </p>
          </div>
          <div className="work-title-container">
            <p>
              <s>minim</s>
              <span className="year">(2020)</span>
            </p>
          </div>
        </div>

        <div className="style-tester">
          <div className="font-tester">
            <h3 className="title">Font</h3>
            <div className="font-information">
              <p ref={jaFontRef} />
              <button
                className="renew-button"
                onClick={() => setJaIndex((prev) => prev + 1)}
              >
                <RoundAutorenew />
              </button>
            </div>
            <div className="font-information">
              <p ref={enFontRef} />
              <button
                className="renew-button"
                onClick={() => setEnIndex((prev) => prev + 1)}
              >
                <RoundAutorenew />
              </button>
            </div>
          </div>
          <h3 className="title">Color Theme</h3>
          <div className="color-tips-container">
            <div className="color-tip black" />
            <div className="color-tip white" />
          </div>
        </div>
      </div>

      <style jsx>{`
        .style-tester {
          position: fixed;
          width: 20rem;
          bottom: 2rem;
          right: 2rem;
          font-family: Noto_Sans_JP serif;
        }
        .work-list {
          margin-top: 20vh;
          font-size: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .work-title-container {
          border-bottom: 0.5px solid black;
          padding-bottom: 0.5rem;
          padding-left: 1rem;
        }

        .link {
          a {
            text-decoration: none;
          }
        }

        .year {
          font-size: 0.8rem;
          padding-left: 1rem;
        }

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
          transition: all 300ms ease;
          background: white;
        }

        .name-container {
          margin-top: 1rem;
          margin-left: 1rem;
          display: flex;
          flex-direction: column;
          .ja {
            font-size: 1.5rem;
          }
        }

        .title {
          margin-bottom: 0.8rem;
        }

        .font-information {
          display: flex;
          text-align: right;
          justify-content: space-between;
          height: 2rem;
        }

        .renew-button {
          background: none;
          border: none;
          font-size: 1.5rem;
        }

        .color-tips-container {
          display: flex;
          gap: 0.5rem;
        }

        .color-tip {
          border: 1px solid #ccc;
          border-radius: 50%;
          width: 1.5rem;
          height: 1.5rem;
        }

        .color-tip.black {
          background: black;
        }

        .color-tip.white {
          background: white;
        }

        .container.active {
          opacity: 1;
          pointer-events: auto;
        }

        @media screen and (max-width: 600px) {
          .style-tester {
          }
        }
      `}</style>
    </>
  );
};
