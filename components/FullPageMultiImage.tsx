import { useState } from "react";

export const FullPageMultiImage = ({
  transitionProgress = 0,
}: {
  transitionProgress?: number;
}) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  return (
    <>
      <div className={`image-container ${loaded && "active"}`}>
        <img
          src="/img/lag/lag1.jpg"
          onLoad={() => {
            setLoaded(true);
          }}
        />
        <img
          src="/img/lag/lag2.jpg"
          onLoad={() => {
            setLoaded(true);
          }}
        />
      </div>
      <style jsx>{`
        .image-container {
          width: 92vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          gap: 2vw;
          margin: 0 auto;
          opacity: 0;
          transition: all 0.5s;
          img {
            width: 45vw;
            height: 100%;
            object-fit: contain;
          }
        }

        .image-container.active {
          opacity: ${1 - Math.abs(transitionProgress) / 100};
        }

        @media screen and (max-width: 600px) {
          .image-container {
            flex-direction: column;
            transform: translate(0, 50%);
            height: auto;
            gap: 2rem;
            img {
              width: 100%;
            }
          }
        }
      `}</style>
    </>
  );
};
